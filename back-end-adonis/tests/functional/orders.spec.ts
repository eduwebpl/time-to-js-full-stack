import { test } from '@japa/runner'

test('should not allow to place order for unauthorized request', async ({ client }) => {
  const response = await client.get('/orders')

  response.assertStatus(403)
})
