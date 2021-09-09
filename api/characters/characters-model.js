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

async function insert(character) {
  const [id] = await db("characters").insert(character)
  return db("characters").where({id}).first()
}

function remove(id) {
  return null
}