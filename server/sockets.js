module.exports = (wss, socketHelpers) => {
  wss.on('connection', (ws) => {

    // Broadcast back the recieved messages to all clients
    ws.on('message', (message) => {
      socketHelpers.broadcastBackMessages(message)
    })

    // Set up a callback for when a client closes the socket.
    ws.on('close', () => {
      console.log(`Client ${ws.id} disconnected`)
    })
  })
}







