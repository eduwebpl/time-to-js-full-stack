import http from 'http'

const { PORT = 3000 } = process.env

// middleware
function parseURL(req) {
  const myURL = new URL(req.url, `http://${req.headers.host}`)
  const [, resource, identifier] = myURL.pathname.split('/')
  req.query = Object.fromEntries(myURL.searchParams.entries())
  req.resource = resource
  req.identifier = identifier
}

const server = http.createServer((req, res) => {
  let status = 200
  let body = {}

  parseURL(req)

  const { method, resource, identifier, query, url } = req
  try {
    switch (method) {
      case 'GET':
        switch (resource) {
          case 'restaurants':
            if (identifier) {
              body = { id: identifier, name: 'Restaurant...' }
            } else {
              body = [{ id: 1, name: 'Restaurant...', query }]
            }
            break
          default:
            status = 404
            body = { message: `URL: ${url} not found` }
        }
        break
      default:
        status = 404
        body = { message: `method: ${method} not available` }
    }
  } catch ({ message }) {
    status = 500
    body = { message }
  } finally {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(body))
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
