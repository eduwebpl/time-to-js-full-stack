import { Router } from 'express'
import { restaurantsController } from './controllers/restaurants.controller.js'
import { usersController } from './controllers/users.controller.js'

export const router = new Router()

router.use('/restaurants', restaurantsController)
router.use('/users', usersController)
