export function errorHandler(err, req, res, next) {
  const { message, stack = '' } = err
  const computedStack =
    process.env.NODE_ENV === 'development' ? stack.split('\n') : undefined
  console.error('errorHandler')
  console.log(err)
  res.status(500).json({ message, stack: computedStack })
}
