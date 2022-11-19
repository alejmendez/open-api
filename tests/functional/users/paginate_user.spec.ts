import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users paginate end point /api/users', (group) => {
  group.tap((test) => test.tags(['@users', '@paginate']))
  group.each.setup(async () => {
    await Database.from('users').delete()
  })

  test('should return an empty list', async ({ client }) => {
    const response = await client.get('/api/users')
    response.assertStatus(200)
    response.assertBodyContains({
      meta: {
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        first_page: 1,
        first_page_url: '/?page=1',
        last_page_url: '/?page=1',
        next_page_url: null,
        previous_page_url: null,
      },
      data: [],
    })
  })

  test('should return a list of 10 users', async ({ client }) => {
    const users = await UserFactory.createMany(10)
    const response = await client.get('/api/users')
    response.assertStatus(200)
    const dataExpected = users.map((user) => {
      const { id, username, email } = user
      return {
        id,
        username,
        email,
      }
    })
    response.assertBodyContains({
      meta: {
        total: 10,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        first_page: 1,
        first_page_url: '/?page=1',
        last_page_url: '/?page=1',
        next_page_url: null,
        previous_page_url: null,
      },
      data: dataExpected,
    })
  })
})
