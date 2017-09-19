const clients = {}
var randomColor = require('randomcolor');

module.exports = (io, dataHelpers) => {
  io.on('connection', (socket) => {

    // Add new users to clients object
    console.log('New connection:', socket.id)
    clients[socket.id] = {
      name: 'Anonymous',
      color: '#6ED3CF',
      boardName: ''
    }

    // NEW CONNECTION
    socket.on('new connection', (boardName) => {
      // Join the board
      socket.join(boardName)
      // Add board info to the clienst object
      clients[socket.id].boardName = boardName
      // Find the board
      const filter = {boardName: boardName}
      dataHelpers.getBoards(filter)
      .then(boards => {
        if (boards.length > 0) {
        // If yes, send all the board items to the client
          io.in(boardName).emit('new connection', {items: boards[0].items})
        }
        // If not send a message back to the client
        else {
          io.in(boardName).emit('new connection', {error: 'No board found!'})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    })

    // Update client's username
    socket.on('new user name', (userName) => {
      const color = randomColor({luminosity: 'light'})
      clients[socket.id].name = userName
      clients[socket.id].color = color
    })

    // Broadcast online users when a new user joins a board
    socket.on('online users', (boardName) => {
      io.in(boardName).emit('online users', getOnlineUsers(boardName))
    })

    // ADD NEW ITEM
    socket.on('add new items', (data) => {
      const filter = {boardName: data.boardName}
      // Give item the id of the client who draw that item
      // No need to loop through the items since there is one item in data
      data.items.client_id = socket.id
      // Find the board
      dataHelpers.getBoards(filter)
      .then(boards => {
        // If the board is in database, update it
        if (boards[0]) {
          dataHelpers.updateItem(filter, {$push: {items: data.items}})
        }
        // If not, create a new board
        else {
          dataHelpers.saveBoard(data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      io.in(data.boardName).emit('add new items', {items: data.items})
    })

    // UNDO AN ITEM
    socket.on('undo an item', function(boardName){
      const filter = {boardName: boardName}
      // Find the board
      dataHelpers.getBoards(filter)
      .then(boards => {
        const board = boards[0]
        // Get items on the board in reverse order
        const items = board.items.reverse()
        // Get the last item on the board drawn by the client who issued an undo request
        const item = items.find(item => item.client_id === socket.id)
        // Update the board by removing the last item
        dataHelpers.updateItem(filter, {$pull: {items: item}})
        .then(() => {
          // Broadcast the new list of items on that board to all clients on that channel
          dataHelpers.getBoards(filter)
            .then(boards => {
              io.in(boardName).emit('undo an item', {items: boards[0].items})
            })
        })
      }).catch((err) => {
        console.log(err)
      })
    })

    // Clear all items on a board
    socket.on('delete all items', (boardName) => {
      const filter = {boardName: boardName}
      dataHelpers.deleteAllItems(filter, {$set: {items: []}})
        .then(() => {
          io.in(boardName).emit('delete all items')
        })
        .catch((err) => {
          console.log(err)
        })
    })

    // Delete a board
    socket.on('delete a board', function(boardName) {
      io.in(boardName).emit('delete a board')
    })

    // DISCONNECT
    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id)
      const boardName = clients[socket.id].boardName
      delete clients[socket.id]
      io.in(boardName).emit('online users', getOnlineUsers(boardName))
    })
  })
}

// GET ONLINE USERS
getOnlineUsers = boardName => {
  const onlineUsers = []
  for (let id in clients) {
    if (clients[id].boardName === boardName) {
      onlineUsers.push({
        id: id,
        name: clients[id].name,
        color: clients[id].color
      })
    }
  }

  return onlineUsers
}

