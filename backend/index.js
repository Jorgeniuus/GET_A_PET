const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static('public'))

app.use('/users', userRoutes)

app.listen(PORT)