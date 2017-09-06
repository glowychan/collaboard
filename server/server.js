// Required Packages
const express      = require('express')
const SocketServer = require('ws').Server
const cors         = require('cors')
require('dotenv').config()



// Set the port to 3001
const PORT = 3001


// Create a new express server
const app = express();
app.use(cors())

// Create a new express server
const server = app
   // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${ PORT }`)
  )


const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI

MongoClient.connect(MONGODB_URI, (err, db) => {
  // Error while connecting to the database
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  }
  // We have a connection to the 'twoodle' db
  console.log(`Connected to mongodb: ${MONGODB_URI}`)

  const DataHelpers = require('./db/data-helpers.js')(db)
  // This module provide an interface to the database of tweets.

  const routes = require('./routes.js')(DataHelpers)

  app.use('/', routes)


})


// Create the WebSockets server
const wss = new SocketServer({ server });

// An empty array of objects that will hold client ids and colors
let connections = []

// A callback that will run when a client connects to the server
wss.on('connection', (ws) => {

  // Broadcast back the recieved messages to all clients
  ws.on('message', (message) => {
    // should be added later:
    // when you get this data update the database too
    broadcastBackMessages(message)
  })

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`)
  })
})





// Handle the messages comming from users
function broadcastBackMessages(message) {
  wss.broadcast(message);
}



// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};



// Ajax calls
// app.get('/', (req, res) => {

//   const boardName = req.query.boardName
//   //check the database (For now the dumy database)
//   let board = db.find(board => board.boardName === boardName)

//   if (!board) {
//     res.status(200).send()
//   } else {
//     res.status(400).send()
//   }
// })

