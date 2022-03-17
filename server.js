const express = require('express')

const server = express()

server.all("/", (req, res) => {
  res.send(`The Server is Ready,
Bot is running and logged into discord!`)
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Bot is ready!")
  })
}

module.exports = keepAlive