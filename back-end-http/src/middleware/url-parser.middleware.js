// middleware
export function urlParserMiddleware(req) {
  const myURL = new URL(req.url, `http://${req.headers.host}`)
  const [, resource, identifier] = myURL.pathname.split('/')
  req.query = Object.fromEntries(myURL.searchParams.entries())
  req.resource = resource
  req.identifier = identifier
}
