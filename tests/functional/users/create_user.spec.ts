import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Users create end point /api/users', (group) => {
  group.tap((test) => test.tags(['@users', '@create']))
  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should create an user and return it', async ({ client }) => {
    const data = {
      username: 'alejmendez',
      email: 'alejmendez@gmail.com',
      password: '123456',
    }
    const response = await client.post('/api/users').json(data)
    response.assertStatus(201)
    response.assertBodyContains({
      username: data.username,
      email: data.email,
    })
  })
})
