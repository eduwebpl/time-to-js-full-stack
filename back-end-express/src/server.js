import express from 'express'
import cors from 'cors'
import { errorHandler } from './error.handler.js'
import 'express-async-errors'
import { authMiddleware } from './middleware/auth.middleware.js'

const { PORT = 3000 } = process.env
const app = express()

app.use(express.json())
app.use(cors())

app.post('/restaurants', authMiddleware, (req, res) => {
  const { body, hello } = req
  res.json({ body, hello })
})

app.get('/restaurants', (req, res) => {
  res.json([
    {id: 1, name: 'Test restaurant 1'},
    {id: 2, name: 'Test restaurant 2'},
    {id: 3, name: 'Test restaurant 3'},
  ])
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  res.json({ restaurantId })
})

app.post('/restaurants/:restaurantId/products', authMiddleware, (req, res) => {
  const { body } = req
  const { restaurantId } = req.params;
  res.json({ body, restaurantId })
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
