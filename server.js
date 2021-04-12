const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const AppRouter = require('./routes/index')
const app = express()

const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', AppRouter)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
