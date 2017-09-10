const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors         = require('cors')

require('dotenv').config()


// Set the port to 3001
const PORT = 3001

server.listen(PORT);

// Express Middlewares
app.use(cors())

// Create Express App
// const server = app
// .use(express.static('public'))
// .listen(
//   PORT, '0.0.0.0', 'localhost',
//   () => console.log(`Listening on ${ PORT }`)
//   )


// Database Connection
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI

// Create WebSockets server
// const wss = new SocketServer({ server });

// Connect to the database
MongoClient.connect(MONGODB_URI)
  .then ((db) => {
    console.log(`Connected to mongodb: ${MONGODB_URI}`)

    // A interface to the database
    const dataHelpers = require('./db/data-helpers.js')(db)

    // An interface to the routes
    const routes = require('./routes.js')(dataHelpers)
    app.use('/', routes)


    require('./socket-io',)(io, dataHelpers)



    // An interface to the websockets
    // const socketHelpers = require('./socketHelpers.js')(wss)
    // require('./sockets')(wss, socketHelpers, dataHelpers)

  })
  .catch((err) => {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  })



