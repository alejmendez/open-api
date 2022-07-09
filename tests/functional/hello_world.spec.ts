import { test } from '@japa/runner'

test('display healthy', async ({ client }) => {
  const response = await client.get('/api/v1/health')

  response.assertStatus(200)
  response.assertBodyContains({ version: '0.0.1' })
})
