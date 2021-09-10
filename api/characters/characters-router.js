const express = require("express")
const Characters = require("./characters-model")


const router = express.Router()

router.get("/", (req,res) => {
  Characters.getAll()
    .then(character => {
      res.status(200).json(character)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})



module.exports = router;