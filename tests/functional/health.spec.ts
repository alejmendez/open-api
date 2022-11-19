import { test } from '@japa/runner'

test('Health check', async ({ client }) => {
  const response = await client.get('/api/health')

  response.assertStatus(200)
  response.assertBodyContains({
    healthy: true,
    report: {
      appKey: {
        displayName: 'App Key Check',
        health: {
          healthy: true,
        },
      },
      env: {
        displayName: 'Node Env Check',
        health: {
          healthy: true,
        },
      },
      lucid: {
        displayName: 'Database',
        health: {
          healthy: true,
          message: 'All connections are healthy',
        },
        meta: [
          {
            connection: 'pg',
            error: null,
            message: 'Connection is healthy',
          },
        ],
      },
    },
  })
})
