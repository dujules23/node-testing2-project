// Bring in dbConfig, supertest, and server
const db = require('../data/dbConfig')
const request = require("supertest")
const server = require("./server")
const router = require("./characters/characters-router")

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

describe("endpoints", () => {
  describe("[GET] /characters", () => {
    it("responds with a 200", async ()=>{
      const res = await request(server).get("/characters")
      expect(res.status).toBe(200)
    })
    it("returns the right number of characters", async ()=> {
      let res
      await db("characters").insert(zato)
      res = await request(server).get("/characters")
      expect(res.body).toHaveLength(1)

      await db("characters").insert(jacko)
      res = await request(server).get("/characters")
      expect(res.body).toHaveLength(2)
    })
    it("returns the correct format for a character", async () =>{
      await db("characters").insert(zato)
      await db("characters").insert(jacko)
      const res = await request(server).get("/characters")
      expect(res.body[0]).toMatchObject({id:1, ...zato})
      expect(res.body[1]).toMatchObject({id:2, ...jacko})
    })
  })
})