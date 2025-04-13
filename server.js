const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({ extended: true }))
server.use(logger('dev'))

// Serve static files from 'public' folder
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Debug route (optional)
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Port setup
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}/`)
})
