import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
  }
}).build()
