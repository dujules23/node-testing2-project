const express = require("express")
const Characters = require("./characters/characters-model")


const server = express();

const charactersRouter = require("./characters/characters-router")


server.use(express.json());
server.use("/api/characters", charactersRouter)

server.get("/", (req,res) =>{
  res.status(200).json("Server is working")
})

server.get("/characters", (req,res) => {
  Characters.getAll()
    .then(character => {
      res.status(200).json(character)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

module.exports = server