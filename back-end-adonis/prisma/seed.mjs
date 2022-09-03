import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const genPassword = () => bcrypt.hash('s4mpl3Pa55word', 10)

const prisma = new PrismaClient()

await prisma.user.deleteMany({})
await prisma.restaurant.deleteMany({})

await prisma.user.create({
  data: {
    id: 1,
    email: 'admin@fooddelivery.com',
    password: await genPassword(),
  },
})
await prisma.user.create({
  data: {
    id: 2,
    email: 'user@fooddelivery.com',
    password: await genPassword(),
  },
})

await prisma.restaurant.create({
  data: {
    id: 1,
    name: 'Na Guod Niaka',
    address: 'sushi-street 23, 90023 Hutomaki',
    type: 'SUSHI',
    products: {
      create: [
        {
          id: 1,
          name: 'Maki',
          description: '24 rolls',
          price: 89.2,
        },
        {
          id: 2,
          name: 'Philadelphia Roll',
          description: '12 rolls',
          price: 122.0,
        },
        {
          id: 3,
          name: 'Volcano Roll',
          description: '3 rolls',
          price: 22.5,
        },
      ],
    },
  },
})

await prisma.restaurant.create({
  data: {
    id: 2,
    name: 'Sooo Fast',
    address: '4 Sixth Ave, Applecross WA 6153, Australia',
    type: 'FAST FOOD',
    products: {
      create: [
        { id: 4, name: 'Big burger', price: 30 },
        {
          id: 5,
          name: 'Fish burger',
          description: 'With codfish',
          price: 40,
        },
      ],
    },
  },
})

await prisma.order.create({
  data: {
    userId: 1,
    restaurantId: 1,
    delivery: {
      create: {
        address: 'My super street',
      },
    },
    products: {
      create: [
        {
          price: 79.2,
          product: {
            connect: { id: 1 },
          },
        },
        {
          price: 12.5,
          product: {
            connect: { id: 3 },
          },
        },
      ],
    },
  },
})

await prisma.order.create({
  data: {
    userId: 2,
    restaurantId: 2,
    delivery: {
      create: {
        address: 'My other street',
        deliveryDate: new Date(),
        status: 'DELIVERED',
      },
    },
    products: {
      create: [
        {
          price: 30,
          product: {
            connect: { id: 5 },
          },
        },
      ],
    },
  },
})
