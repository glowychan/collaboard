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
    saveItem: function(filter, edit) {
      return new Promise((resolve, reject) => {
        db.collection('boards').findOneAndUpdate(filter, edit, (err) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(null)
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
        db.collection('boards').remove(board, (err) => {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            console.log("resolve");
            resolve(null);
          }
        })
      })
    }


  }
}
