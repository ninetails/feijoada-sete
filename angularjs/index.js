const http = require('http')
const { join } = require('path')
const { readFile } = require('fs')
const express = require('express')
const cors = require('cors')

const assets = '<script src="http://localhost:5000/app.js" defer></script>'

const app = express()
app
  .disable('x-powered-by')
  .use(express.static(join(__dirname, 'public')))
  .use(cors({
    exposedHeaders: ['X-Microfront-Assets']
  }))
  .get('/angularjs*', (req, res) =>
    readFile(join(__dirname, 'public', 'app.html'), (err, data) => {
      if (err) throw err

      if (req.headers['x-microfront']) {
        res.set({
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'Expires': '-1',
          'Pragma': 'no-cache',
          'X-Microfront-Assets': assets
        }).status(200).send(data)
      } else {
        res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Angular Server</title>
</head>
<body>
  ${data}
  ${assets}
</body>
</html>
`)
      }
    }))

const server = http.createServer(app)

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
