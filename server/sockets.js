module.exports = (wss, socketHelpers, dataHelpers) => {
  wss.on('connection', (ws) => {

    // Broadcast back the recieved messages to all clients
    ws.on('message', (data) => {

      const parsedData = JSON.parse(data)
      const filter     = {boardName: parsedData.boardName}

      if (parsedData.type === 'newConnection') {
        dataHelpers.getBoards(filter)
          .then((boards) => {
            if (boards.length > 0) {
              ws.send(JSON.stringify(boards[0]))
            }
            else {
              const error = {error: "No board found!"}
              ws.send(JSON.stringify(error))
            }
          })
          .catch((err) => {
            // fix this later
          })
      }
      else if (parsedData.type === 'add') {

        // Borad Name is unique, this function return zero/one board here
        dataHelpers.getBoards(filter)
          .then((boards) => {
            if (boards[0]) {
              dataHelpers.updateItem(filter, {$push: {items: parsedData.items}})
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
      } else if (parsedData.type === 'undo') {
        dataHelpers.updateItem(filter, {$pop: {items: 1}})
        .then(() => {
          const data = {
            boardName: parsedData.boardName,
            type: 'undo'
          };
          socketHelpers.broadcastBackMessages(JSON.stringify(data));
        }).catch((err) => {
          // fix later
          console.log(':(')
        })
      }
    })

    // Set up a callback for when a client closes the socket.
    ws.on('close', () => {
      console.log(`Client ${ws.id} disconnected`)
    })
  })
}







