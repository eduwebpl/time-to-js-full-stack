import { appResolver } from './resolvers/app.resolver.js'
import { restaurantResolver } from './resolvers/restaurant.resolver.js'
import { userResolver } from './resolvers/user.resolver.js'

const resolver = {
  ...appResolver,
  ...restaurantResolver,
  ...userResolver,
}

export async function requestHandler(req, res) {
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
