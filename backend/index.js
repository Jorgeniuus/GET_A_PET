const express = require('express')
const cors = require('cors')
const PORT = 5000

const app = express()

//config JSON response
app.use(express.json())

//solver CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//public folder for images
app.use(express.static('public'))

//Routes

app.listen(PORT)