// middleware
export function jsonBodyParserMiddleware(req) {
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
