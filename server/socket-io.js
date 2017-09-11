module.exports = (io, dataHelpers) => {

  io.on('connection', function (socket) {


    // NEW CONNECTION
    console.log('New connection:', socket.id)
    socket.on('new connection', function(boardName){
      socket.join(boardName)

      const filter = {boardName: boardName}
      dataHelpers.getBoards(filter)
      .then((boards) => {
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
        // fix this later
      })
    })



    // ADD NEW ITEM
    socket.on('add new items', function(data){
      const filter = {boardName: data.boardName}
      // Give item the id of the client who draw that item
      // No need to loop through the items since there is one item in data
      data.items.client_id = socket.id
      // Find the board
      dataHelpers.getBoards(filter)
      .then((boards) => {
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
        // fix this later
      })
      io.in(data.boardName).emit('add new items', {items: data.items})
    })



    // UNDO AN ITEM
    socket.on('undo an item', function(boardName){
      const filter = {boardName: boardName}
      // Find the board
      dataHelpers.getBoards(filter)
      .then((boards) => {
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
            .then((boards) => {
              io.in(boardName).emit('undo an item', {items: boards[0].items})
            })
        })
      }).catch((err) => {
        // fix later
      })
    })

    socket.on('delete all items', function(boardName) {
      io.in(boardName).emit('delete all items')
    })

    socket.on('delete a board', function(boardName) {
      io.in(boardName).emit('delete a board')
    })


  })
}




