'use strict'

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // GET BOARDS BASED ON THE FILTER
    getBoards: function (filter, callback) {
      db.collection('boards').find(filter).toArray((err, boards) => {
        console.log(boards)
        if (err) {
          return callback(err)
        }
        callback(null, boards)
      })
    }


  }
}
