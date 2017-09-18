'use strict'

const express = require('express')
const routes  = express.Router()
const Mongo   = require('mongodb')

module.exports = function(dataHelpers) {

  // GET ONE BORAD BY NAME
  routes.get('/', (req, res) => {
    const filter = {boardName: req.query.boardName}
    // Board Name is unique, so getBoards will return just one board here
    dataHelpers.getBoards(filter)
      .then(boards => {
        if (!boards[0]) {
          let board = {
            boardName: req.query.boardName,
            items: []
          }
          dataHelpers.saveBoard(board)
            .then(() => {
              res.status(200).send()
            })
        } else {
          res.status(400).send()
        }
      })
      .catch(err => {
        return res.status(500).send()
      })
  })

  // DELETE ONE BOARD
  routes.delete('/twoodles/:boardName', (req, res) => {
    const filter = {boardName: req.params.boardName};
    dataHelpers.deleteBoard(filter)
      .then(board => {
        res.status(200).send();
      })
      .catch(err => {
        res.status(500).send();
      })
  })

  return routes
}