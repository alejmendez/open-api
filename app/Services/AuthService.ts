import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

interface Authentication {
  isAuthenticated: boolean
  user: User
  token: any
}

const authenticate = async (auth, email: string, password: string) => {
  const user = await User.query().where('email', email.toLowerCase()).firstOrFail()
  const isVerified = await Hash.verify(user.password, password)

  const authenticated: Authentication = {
    isAuthenticated: isVerified,
    user,
    token: {},
  }

  if (!authenticated.isAuthenticated) {
    return authenticated
  }

  authenticated.token = await auth.use('jwt').generate(user, {
    payload: {
      email: user.email,
    },
  })

  return authenticated
}

const refresh = async (auth, refreshToken) => {
  const token = await auth.use('jwt').loginViaRefreshToken(refreshToken)
  return token
}

const logout = async (auth) => {
  await auth.use('jwt').revoke()
  return true
}

export { authenticate, refresh, logout }
