import { authenticate, refresh, logout } from 'App/Services/AuthService'
import AuthUserValidator from 'App/Validators/AuthUserValidator'

export default class AuthController {
  public async index({ request, response, auth }) {
    const payload = await request.validate(AuthUserValidator)

    const authenticated = await authenticate(auth, payload.email, payload.password)
    if (!authenticated.isAuthenticated) {
      return response.unauthorized('Invalid credentials')
    }

    return {
      token: authenticated.token,
      user: authenticated.user,
    }
  }

  public async refresh({ auth, request }) {
    const refreshToken = request.input('refresh_token')
    return refresh(auth, refreshToken)
  }

  public async logout({ auth }) {
    return {
      revoked: logout(auth),
    }
  }
}
