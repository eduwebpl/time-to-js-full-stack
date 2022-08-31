import express from 'express'
import { errorHandler } from './error.handler.js'
import 'express-async-errors'
import { authMiddleware } from './middleware/auth.middleware.js'

const { PORT = 3000 } = process.env
const app = express()

app.use(express.json())

app.use(authMiddleware)

app.post('/restaurants', (req, res) => {
  const { body, hello } = req
  res.json({ body, hello })
})

app.get('/restaurants', (req, res) => {
  const { query } = req
  res.json([query])
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  res.json({ restaurantId })
})

app.post('/user/sing-in', async (req, res) => {
  res.json({ hello: 'ok' })
})

app.all('*', (req, res) => {
  const { url, method } = req
  res
    .status(404)
    .json({ message: `Path ${url} for method ${method} not found :(` })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})

process.on('uncaughtException', (err) => {
  console.error('uncaughtException')
  console.log(err)
})
