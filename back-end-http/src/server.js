import http from 'http'

const { PORT = 3000 } = process.env

const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.headers)

  try {
    JSON.parse('{"hello":WORLD}')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ hello: 'World' }))
    res.end()
  } catch ({ message }) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message }))
    res.end()
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
