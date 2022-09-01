import { Router } from 'express'

export const usersController = new Router()

usersController.post('/sing-in', async (req, res) => {
  res.json({ hello: 'ok' })
})
