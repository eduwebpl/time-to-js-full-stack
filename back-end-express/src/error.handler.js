import { Prisma } from '@prisma/client'

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let { message, stack = '', status = 500 } = err
  const computedStack =
    process.env.NODE_ENV === 'development' ? stack.split('\n') : undefined
  if (err instanceof Prisma.NotFoundError) {
    status = 404
  }
  console.error('errorHandler')
  console.log(err)
  res.status(status).json({ message, stack: computedStack })
}
