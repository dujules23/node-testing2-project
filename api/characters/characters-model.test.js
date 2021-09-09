// Bring in model and dbConfig

const Character = require('./characters-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("characters").truncate()
})

afterAll(async () => {
  await db.destroy()
})



// testing the environment varible in jest environment
it("correct env", () =>{
  expect(process.env.DB_ENV).toBe("testing")
})