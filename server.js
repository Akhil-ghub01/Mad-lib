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

// Debug route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// POST route for Mad Lib form
server.post('/ITC505/lab-7', (req, res) => {
  const { noun, verb, adjective, pluralNoun, place } = req.body
  console.log('POST body:', req.body) // Debug line

  if (!noun || !verb || !adjective || !pluralNoun || !place) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `)
  }

  const madLib = `
    Once upon a time in <strong>${place}</strong>, there was a <strong>${adjective}</strong> <strong>${noun}</strong>.
    It loved to <strong>${verb}</strong> with <strong>${pluralNoun}</strong> every day!
  `

  res.send(`
    <h1>Your Mad Lib!</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `)
})

// Set up port
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}/`)
})
