require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const config = require('./config')

const firebase = require('firebase')

const { getData, postData } = require('./service')

// Configuration
const app = express()
const port = config.port

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(cors())

app.get('/', async (req, res) => {
  res.status(200).json(await getData())
})

app.post('/', async (req, res) => {
  const result = await postData(req.body)
  if (result) res.status(200).json({ isSuccess: result })
  else res.status(500).json({ isSuccess: result })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
