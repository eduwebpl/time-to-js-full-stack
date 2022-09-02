import { Router } from 'express'
import { ordersController } from './controllers/orders.controller.js'
import { restaurantsController } from './controllers/restaurants.controller.js'
import { usersController } from './controllers/users.controller.js'
import { authMiddleware } from './middleware/auth.middleware.js'

export const router = new Router()

router.use('/restaurants', restaurantsController)
router.use('/orders', authMiddleware, ordersController)
router.use('/users', usersController)
