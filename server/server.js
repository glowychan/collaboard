'use strict'

const app    = require('express')()
const server = require('http').Server(app)
const io     = require('socket.io')(server)
const cors   = require('cors')

require('dotenv').config()

// Set the port to 3001
const PORT = 3001
server.listen(process.env.PORT || PORT);

// Express Middlewares
app.use(cors())

// Database Connection
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI

// Connect to the database
MongoClient.connect(MONGODB_URI)
  .then (db => {
    console.log(`Connected to mongodb: ${MONGODB_URI}`)

    // An interface to the database
    const dataHelpers = require('./db/data-helpers.js')(db)

    // An interface to the routes
    const routes = require('./routes.js')(dataHelpers)
    app.use('/', routes)

    // An interface to websockets
    require('./socket-io')(io, dataHelpers)
  })
  .catch(err => {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  })