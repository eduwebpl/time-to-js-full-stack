import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { createOrderDtoSchema } from '../dto-schema/order-dto.schema.js'
import { validationMiddleware } from '../middleware/validation.middleware.js'
import { orderService } from '../services/order.service.js'

export const ordersController = new Router()
const prisma = new PrismaClient()

ordersController.get('', async (req, res) => {
  const { id: userId } = req.user
  const orders = await prisma.order.findMany({
    where: { userId },
    select: {
      id: true,
      date: true,
      restaurant: true,
      delivery: true,
      products: true,
    },
  })
  res.json(orders)
})

ordersController.get('/:orderId', async (req, res) => {
  const { orderId } = req.params
  const { id: userId } = req.user
  const orders = await prisma.order.findFirstOrThrow({
    where: { userId, id: Number(orderId) },
    select: {
      id: true,
      date: true,
      restaurant: true,
      delivery: true,
      products: true,
    },
  })
  res.json(orders)
})

ordersController.post(
  '',
  validationMiddleware({ body: createOrderDtoSchema }),
  async (req, res) => {
    const { id: userId } = req.user
    const { restaurantId, productsIds, address } = req.body
    const order = await orderService.placeAnOrderByUser({
      address,
      userId,
      restaurantId,
      productsIds,
    })
    res.json(order)
  }
)
