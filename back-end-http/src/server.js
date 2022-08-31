import http from 'http'
import { errorHandler } from './error.handler.js'
import { jsonBodyParserMiddleware } from './middleware/json-body-parser.middleware.js'
import { urlParserMiddleware } from './middleware/url-parser.middleware.js'
import { requestHandler } from './request.handler.js'

const { PORT = 3000 } = process.env

const server = http.createServer(async (req, res) => {
  urlParserMiddleware(req)
  try {
    await jsonBodyParserMiddleware(req)
    const body = await requestHandler(req, res)
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(body))
    res.end()
  } catch (error) {
    errorHandler(error, req, res)
  }
})

server.listen(PORT)
server.on('listening', () => {
  console.log(`Server is listening on http://localhost:${PORT}/`)
})

process.on('uncaughtException', (err) => {
  console.error('uncaughtException')
  console.log(err)
})
