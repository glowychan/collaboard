// Required Packages
const express      = require('express')
const SocketServer = require('ws').Server
const cors = require('cors')




// Set the port to 3001
const PORT = 3001



// TEMPORARY DB
const db = [
  {
    borderid: 1,
    name: 'conference-call',
    items:  [
      {
        color: "#000000",
        id: "78f61f62-d291-4853-a7a2-390810f1e5f5",
        points: [
          {'x': 140, 'y': 123.85415649414062},
          {'x': 141, 'y': 123.85415649414062},
          {'x': 152, 'y': 123.85415649414062},
          {'x': 168, 'y': 123.85415649414062},
          {'x': 191, 'y': 123.85415649414062},
          {'x': 213, 'y': 125.85415649414062}
        ],
        tool: "pencil"
      }
    ]
  },
  {
    borderid: 2,
    name: 'chem-class',
    items:  [
      {
        color: "#000000",
        id: "78f61f62-d291-4853-a7a2-390810f1e5f5",
        points: [
          {'x': 140, 'y': 171.85415649414062},
          {'x': 141, 'y': 171.85415649414062},
          {'x': 152, 'y': 171.85415649414062},
          {'x': 168, 'y': 171.85415649414062},
          {'x': 191, 'y': 171.85415649414062},
          {'x': 213, 'y': 171.85415649414062}
        ],
        tool: "pencil"
      }
    ]
  }
]



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

// Create the WebSockets server
const wss = new SocketServer({ server });

// An empty array of objects that will hold client ids and colors
let connections = []

// A callback that will run when a client connects to the server
wss.on('connection', (ws) => {

  // Broadcast back the recieved messages to all clients
  ws.on('message', (message) => {
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
app.get('/', (req, res) => {

  const boardName = req.query.boardName
  //check the database (For now the dumy database)
  let board = db.find(board => board.name === boardName)

  if (!board) {
    res.status(200).send()
  } else {
    res.status(400).send()
  }
})

