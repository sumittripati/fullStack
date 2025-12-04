const express = require('express')
const app = express()
var cors = require('cors')
const authRouter = require('./Routers/authRoutes')
const loger = require('./Middleware/loger')
const notFoundRouter = require('./Middleware/notFound')
const errorMiddleware = require('./Middleware/errorMiddleware')
const protectRoute = require('./Routers/protectedRoutes')
const curdRouter = require('./Routers/curdRouter/curdRoutes')

app.use(express.json())
app.use(loger)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use('/curd', curdRouter)
app.use('/api', authRouter)
app.use('/buy', protectRoute)

app.get('/', (req, res) => {
    res.status(200).json({ message: "hello world" })
})

app.use(notFoundRouter)
app.use(errorMiddleware)

module.exports = app