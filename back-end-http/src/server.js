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

// middleware
function parseBodyAsJSON(req) {
  const { headers } = req
  return new Promise((resolve, reject) => {
    let body = Buffer.alloc(0)
    req.on('error', reject)
    req.on('data', (chunk) => {
      body = Buffer.concat([body, chunk])
    })
    req.on('end', () => {
      if (body.length && headers['content-type'] === 'application/json') {
        try {
          req.body = JSON.parse(body)
        } catch (e) {
          reject(e)
        }
      }
      resolve()
    })
  })
}

const resolver = {
  'GET:': () => ({ hello: 'World' }),
  'GET:restaurants': (req) => {
    const { identifier, query } = req
    if (identifier) {
      return { id: identifier, name: 'Restaurant...' }
    } else {
      return [{ id: 1, name: 'Restaurant...', query }]
    }
  },
  'POST:restaurants': (req) => {
    return { myBodyIs: req.body }
  },
}

async function handleRequest(req, res) {
  const { method, resource, url } = req
  const action = resolver[`${method}:${resource}`]
  if (action) {
    res.statusCode = 200
    return action(req, res)
  } else {
    res.statusCode = 404
    return { message: `URL: /${url} for method: ${method} not found` }
  }
}

const server = http.createServer(async (req, res) => {
  parseURL(req)
  try {
    await parseBodyAsJSON(req)
    const body = await handleRequest(req, res)
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(body))
    res.end()
  } catch ({ message }) {
    res.statusCode = 500
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
