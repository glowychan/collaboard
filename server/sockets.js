const uuid = require('uuid/v4');

module.exports = (wss, socketHelpers, dataHelpers) => {
  wss.on('connection', (ws) => {
    // Give every user a client id so that it can be attached to the items
    ws.id = uuid()
    console.log(`Client "${ws.id}" connected.`)

    // Broadcast back the recieved messages to all clients
    ws.on('message', (data) => {

      const parsedData = JSON.parse(data)
      const filter     = {boardName: parsedData.boardName}

      // On new connection:
      if (parsedData.type === 'newConnection') {
        // Check if the board exists (Borad Name is unique, getBoards returns zero/one board here)
        dataHelpers.getBoards(filter)
          .then((boards) => {
            // If yes, send all the board items to the client
            if (boards.length > 0) {
              const message = boards[0]
              message.type = 'add new item'
              ws.send(JSON.stringify(message))
            }
            // If not send a message back to the client
            else {
              const error = {error: 'No board found!'}
              ws.send(JSON.stringify(error))
            }
          })
          .catch((err) => {
            // fix this later
          })
      }
      // On receiving new item
      else if (parsedData.type === 'add new item') {
        // Find the board (Borad Name is unique, getBoards returns zero/one board here)
        dataHelpers.getBoards(filter)
          .then((boards) => {
            // Give the id of the client who draw that item
            parsedData.items.connection_id = ws.id
            // If the board is in database, update it
            if (boards[0]) {
              dataHelpers.updateItem(filter, {$push: {items: parsedData.items}})
            }
            // If not, create a new board
            else {
              const board = {
                boardName: parsedData.boardName,
                items: [parsedData.items],
              }
              dataHelpers.saveBoard(board)
            }
          })
          .catch((err) => {
            // fix this later
          })
          // Broadcast the new item to all clients
          socketHelpers.broadcastBackMessages(data)

      }
      // On receiving an undo request:
      else if (parsedData.type === 'undo an item') {
        dataHelpers.getBoards(filter)
          .then((boards) => {
            if (boards[0]) {
              dataHelpers.updateItem(filter, {$pop: {items: 1}})
            }
            else {
              const board = {
                boardName: parsedData.boardName,
                items: [parsedData.items],
              }
              dataHelpers.saveBoard(board)
            }
          })
          .catch((err) => {
            // fix this later
          })
          socketHelpers.broadcastBackMessages(data)
      }
    })
    // A callback for when a client closes the socket
    ws.on('close', () => {
      console.log(`Client ${ws.id} disconnected.`)
    })
  })
}


