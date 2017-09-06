module.exports = function makeSocketHelper(wss) {
  return {
    broadcastBackMessages: (data) => {
      wss.clients.forEach((client) => {
        client.send(data)
      })
    },
    // initializeBoard: (data, client) => {
    //   client.send(data)
    // }
  }
}
