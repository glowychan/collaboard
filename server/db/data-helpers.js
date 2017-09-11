'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // GET BOARDS BASED ON THE FILTER
    getBoards: function (filter) {

      return new Promise((resolve, reject) => {
        db.collection('boards').find(filter).toArray((err, boards) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(boards)
          }
        })
      })
    },

    // SAVE NEW ITEM TO AN EXISTING BOARD
    updateItem: function(filter, edit) {
      return new Promise((resolve, reject) => {
        db.collection('boards').findOneAndUpdate(filter, edit, (err, board) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(board)
          }
        })
      })
    },

    // DELETE ALL ITEMS FROM AN EXISTING BOARD
    deleteAllItems: function(filter, edit) {
      return new Promise((resolve, reject) => {
        db.collection('boards').update(filter, edit, (err, board) => {
          if (err) {
            reject(err)
          } else {
            resolve(board)
          }
        })
      })
    },

    // SAVE NEW BOARD
    saveBoard: function(board) {
      return new Promise((resolve, reject) => {
        db.collection('boards').insert(board, (err) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(null)
          }
        })
      })
    },

    deleteBoard: function(board) {
      return new Promise((resolve, reject) => {
        db.collection('boards').deleteOne(board, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        })
      })
    }


  }
}
