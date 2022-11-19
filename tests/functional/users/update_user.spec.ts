import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users update end point /api/users', (group) => {
  group.tap((test) => test.tags(['@users', '@update']))
  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should update an user and return it', async ({ client }) => {
    const user = await UserFactory.create()
    const data = {
      username: 'alejmendez',
      email: 'alejmendez@gmail.com',
      password: '123456',
    }

    const response = await client.put(`/api/users/${user.id}`).json(data)
    response.assertStatus(200)
    response.assertBodyContains({
      id: user.id,
      username: data.username,
      email: data.email,
    })
  })
})
