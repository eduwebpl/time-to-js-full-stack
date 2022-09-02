import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { PrismaClient } from '@prisma/client'
import { validationMiddleware } from '../middleware/validation.middleware.js'
import {
  createRestaurantDtoSchema,
  updateRestaurantDtoSchema,
} from '../dto-schema/restaurant-dto.schema.js'

const prisma = new PrismaClient()

export const restaurantsController = new Router()

restaurantsController.post(
  '',
  authMiddleware,
  validationMiddleware({ body: createRestaurantDtoSchema }),
  async (req, res) => {
    const { body } = req
    const result = await prisma.restaurant.create({ data: body })

    res.status(201).json(result)
  }
)

restaurantsController.get('', async (req, res) => {
  const { page = '1', count = '50' } = req.query
  const pageNum = Number(page)
  const countNum = Number(count)
  const take = countNum <= 0 ? 1 : countNum
  const skip = (pageNum - 1) * take
  const restaurants = await prisma.restaurant.findMany({ skip, take })
  res.json(restaurants)
})

restaurantsController.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params
  const restaurant = await prisma.restaurant.findFirstOrThrow({
    where: {
      id: Number(restaurantId),
    },
  })
  res.json(restaurant)
})

restaurantsController.patch(
  '/:restaurantId',
  authMiddleware,
  validationMiddleware({ body: updateRestaurantDtoSchema }),
  async (req, res) => {
    const { restaurantId } = req.params
    const { body } = req
    const restaurant = await prisma.restaurant.update({
      where: {
        id: Number(restaurantId),
      },
      data: body,
    })
    res.json(restaurant)
  }
)

restaurantsController.post(
  '/:restaurantId/products',
  authMiddleware,
  (req, res) => {
    const { body } = req
    const { restaurantId } = req.params
    res.json({ body, restaurantId })
  }
)
