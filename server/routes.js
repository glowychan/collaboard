'use strict'

const express = require('express')
const routes  = express.Router()
const Mongo   = require('mongodb')


module.exports = function(dataHelpers) {

  routes.get('/', (req, res) => {

    const filter = {boardName: req.query.boardName}
    // Board Name is Unique, so getBoards will return just one board here
    dataHelpers.getBoards(filter)
      .then((boards) => {
        if (!boards[0]) {
          res.status(200).send()
        } else {
          res.status(400).send()
        }
      })
      .catch((err) => {
        return res.status(500).send()
      })

  })

  return routes

}
