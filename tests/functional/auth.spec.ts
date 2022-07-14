import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Auth end point /api/v1/auth', (group) => {
  group.tap((test) => test.tags(['@auth']))

  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should authenticate an user', async ({ client, assert }) => {
    const userPassword = '12345678'
    const user = await UserFactory.merge({ password: userPassword }).create()

    const response = await client.post('/api/v1/auth').form({
      email: user.email,
      password: userPassword,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      token: {
        type: 'bearer',
      },
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    })

    const { token } = response.body()
    assert.match(token.token, /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/)
    assert.match(token.refreshToken, /(^[A-Za-z0-9-_]*$)/)
    assert.property(token, 'expires_at')
  })
})
