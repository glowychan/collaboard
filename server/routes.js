'use strict'

const express = require('express')
const routes  = express.Router()
const Mongo   = require('mongodb')

// need method override to make delete requests?
const methodOverride = require('method-override');
routes.use(methodOverride('_method'));

module.exports = function(dataHelpers) {

  routes.get('/', (req, res) => {

    const filter = {boardName: req.query.boardName}
    // Board Name is Unique, so getBoards will return just one board here
    dataHelpers.getBoards(filter)
      .then((boards) => {
        if (!boards[0]) {
          let board = {
            boardName: req.query.boardName,
            items: []
          }
          dataHelpers.saveBoard(board)
            .then( () => {
              res.status(200).send()
            })
        } else {
          res.status(400).send()
        }
      })
      .catch((err) => {
        return res.status(500).send()
      })

  });

  routes.delete('/twoodles/:boardName', (req, res) => {
    const filter = {boardName: req.params.boardName};

    dataHelpers.deleteBoard(filter)
      .then((board) => {
        console.log(board)
        res.status(200);
      })
      .catch(err => {
        res.status(500).send();
      })

  })

  return routes

}
