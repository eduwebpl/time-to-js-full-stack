import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { errorHandler } from './error.handler.js'
import { router } from './router.js'

const { PORT = 3000 } = process.env
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

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
