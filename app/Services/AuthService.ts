import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

const authenticate = async (auth, email: string, password: string) => {
  const user = await User.query().where('email', email).firstOrFail()

  if (!(await Hash.verify(user.password, password))) {
    return false
  }

  const token = await auth.use('api').generate(user)
  return token
}

const logout = async (auth) => {
  await auth.use('api').revoke()
  return {
    revoked: true,
  }
}

export { authenticate, logout }
