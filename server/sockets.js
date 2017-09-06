module.exports = (wss, socketHelpers, dataHelpers) => {
  wss.on('connection', (ws) => {

    // Broadcast back the recieved messages to all clients
    ws.on('message', (data) => {

      const parsedData = JSON.parse(data)

      console.log(parsedData)
      const filter = {boardName: parsedData.boardName}

      // Borad Name is unique, this function return zero/one board here
      dataHelpers.getBoards(filter)
        .then((boards) => {
          console.log(boards)
          if (boards[0]) {
            dataHelpers.saveItem(filter, {$push: {items: parsedData.item}})
          }
          else {
            const board = {
              boardName: parsedData.boardName,
              items: parsedData.item
            }
            dataHelpers.saveBoard(board)
          }
        })
        .catch((err) => {
          return res.status(500).send()
        })
      socketHelpers.broadcastBackMessages(data)
    })

    // Set up a callback for when a client closes the socket.
    ws.on('close', () => {
      console.log(`Client ${ws.id} disconnected`)
    })
  })
}







