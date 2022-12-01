const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT

const router = require('./routes')

app.use(express.json())
app.use(cors())

app.use(router)

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})