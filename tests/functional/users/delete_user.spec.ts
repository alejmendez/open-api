import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users delete end point /api/users', (group) => {
  group.tap((test) => test.tags(['@users', '@delete']))
  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should delete an user', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.delete(`/api/users/${user.id}`)
    response.assertStatus(204)
  })
})
