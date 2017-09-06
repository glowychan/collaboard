module.exports = function makeSocketHelper(wss) {
  return {
    broadcastBackMessages: (message) => {
      wss.clients.forEach((client) => {
        client.send(message)
      })

    }
  }
}
