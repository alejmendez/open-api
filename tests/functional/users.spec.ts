import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users end point /api/v1/users', (group) => {
  group.tap((test) => test.tags(['@users']))
  test('should return an empty list', async ({ client }) => {
    const response = await client.get('/api/v1/users')
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
    const response = await client.get('/api/v1/users')
    response.assertStatus(200)
    const dataEspected = users.map((user) => {
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
      data: dataEspected,
    })
  })

  test('should return an user', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/api/v1/users/${user.id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    })
  })

  test('should create an user and return it', async ({ client }) => {
    const data = {
      username: 'alejmendez',
      email: 'alejmendez@gmail.com',
      password: '123456',
    }
    const response = await client.post('/api/v1/users').json(data)
    response.assertStatus(201)
    response.assertBodyContains({
      user: {
        username: 'alejmendez',
        email: 'alejmendez@gmail.com',
      },
    })
  })

  test('should update an user and return it', async ({ client }) => {
    const user = await UserFactory.create()
    const data = {
      username: 'alejmendez',
      email: 'alejmendez@gmail.com',
      password: '123456',
    }

    const response = await client.put(`/api/v1/users/${user.id}`).json(data)
    response.assertStatus(200)
    response.assertBodyContains({
      user: {
        id: user.id,
        username: data.username,
        email: data.email,
      },
    })
  })

  test('should delete an user', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.delete(`/api/v1/users/${user.id}`)
    response.assertStatus(204)
  })
})
