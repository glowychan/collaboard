module.exports = (wss, socketHelpers, dataHelpers) => {
  wss.on('connection', (ws) => {

    // Broadcast back the recieved messages to all clients
    ws.on('message', (data) => {

      const parsedData = JSON.parse(data)
      const filter = {boardName: parsedData.boardName}

      if (parsedData.type === 'newConnection') {
        dataHelpers.getBoards(filter)
          .then((boards) => {
            if (boards.length > 0) {
              ws.send(JSON.stringify(boards[0]))
            }
          })
          .catch((err) => {
            // fix this later
          })
      }
      else {

        // Borad Name is unique, this function return zero/one board here
        dataHelpers.getBoards(filter)
          .then((boards) => {
            if (boards[0]) {
              dataHelpers.saveItem(filter, {$push: {items: parsedData.items}})
            }
            else {
              const board = {
                boardName: parsedData.boardName,
                items: [parsedData.items]
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

    // Set up a callback for when a client closes the socket.
    ws.on('close', () => {
      console.log(`Client ${ws.id} disconnected`)
    })
  })
}







