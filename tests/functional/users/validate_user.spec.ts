import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users validate end point /api/v1/users', (group) => {
  group.tap((test) => test.tags(['@users', '@validate']))
  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should validate the payload on create', async ({ client }) => {
    const data = {
      username: 'alejmendez',
      email: 'alejmendez@gmail.com',
      password: '123456',
    }
    const response = await client.post('/api/v1/users').json(data)
    response.assertStatus(201)
    response.assertBodyContains({
      username: data.username,
      email: data.email,
    })
  })
})
