const express = require("express")
const Characters = require("./characters/characters-model")


const server = express();




server.use(express.json());


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

server.post("/characters", (req, res) => {
  Characters.insert(req.body)
    .then(character => {
      res.status(201).json(character)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete("/characters/:id", (req, res) => {
  Characters.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      }
      else {
        res.status(404).json({message: "Record not Found"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: `server error ${err}`})
    })
})
module.exports = server