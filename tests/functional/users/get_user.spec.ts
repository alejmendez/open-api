import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users get end point /api/users', (group) => {
  group.tap((test) => test.tags(['@users', '@get']))
  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should return an user', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/api/users/${user.id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    })
  })
})
