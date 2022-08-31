export function authMiddleware(req, res, next) {
  // example auth
  const { authorization = '' } = req.headers
  const [, token] = authorization.split(' ')
  if (token === 'sample-t0k3n') {
    // DB request...
    req.user = { id: 1, name: 'Mike' }
    return next()
  }
  next(new Error('Not authorized!'))
}
