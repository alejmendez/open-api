import { authenticate, logout } from 'App/Services/AuthService'

export default class AuthController {
  public async index({ request, response, auth }) {
    const email = request.input('email')
    const password = request.input('password')

    const token = authenticate(auth, email, password)
    if (!token) {
      return response.unauthorized('Invalid credentials')
    }

    return token
  }

  public async logout({ auth }) {
    return logout(auth)
  }
}
