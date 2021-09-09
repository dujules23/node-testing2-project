const db = require('../../data/dbConfig')


module.exports ={
  getAll,
  getById,
  insert,
  remove
}

function getAll() {
  return db('characters')
}

function getById(id) {
  return null
}

function insert(character) {
  return null
}

function remove(id) {
  return null
}