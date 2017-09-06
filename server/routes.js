'use strict'

const express = require('express')
const routes  = express.Router()
const Mongo   = require('mongodb')


module.exports = function(DataHelpers) {

  routes.get('/', (req, res) => {

    const filter = {boardName: req.query.boardName}
    // Board Name is Unique, so getBoards will return just one board here
    DataHelpers.getBoards(filter, (err, boards) => {
      if (err) {
        return res.status(500).send()
      } else {
        if (!boards[0]) {
          res.status(200).send()
        } else {
          res.status(400).send()
        }
      }
    })
  })

  return routes

}
