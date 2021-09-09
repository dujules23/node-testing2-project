// Bring in model and dbConfig

const Character = require('./characters-model')
const db = require('../../data/dbConfig')

// Variables used to test, avoids rewriting of code
const zato = { name: "Zato=1"}
const jacko = { name: "Jack-O"}

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

// Groub of Characters from model
describe("Characters Model", () =>{
  describe("insert function", () => {
    it("adds a character to the db", async() =>{
      let all 
      await Character.insert(zato)
      all = await db("characters")
      expect(all).toHaveLength(1)

      await Character.insert(jacko)
      all = await db("characters")
      expect(all).toHaveLength(2)
    })
    it("has the correct values from db", async() =>{
      const character = await Character.insert(zato)
      expect(character).toMatchObject({id:1, ...zato})
    })
  })
})