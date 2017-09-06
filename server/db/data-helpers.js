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
    }

  }
}
