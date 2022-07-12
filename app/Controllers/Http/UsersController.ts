import CreateUserValidator from 'App/Validators/CreateUserValidator'
import {
  createUser,
  destroyUser,
  getOneUser,
  paginatedListUser,
  updateUser,
} from 'App/Services/UsersService'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ request }) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await paginatedListUser(page, limit)

    return users.toJSON()
  }

  public async show({ params }) {
    const { id } = params
    const user = await getOneUser(id)
    return user
  }

  public async store({ request, response }) {
    try {
      const payload = await request.validate(CreateUserValidator)
      const user = await createUser(payload)

      return response.status(201).send({ user })
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async update({ request, response, params }) {
    try {
      const { id } = params
      const payload = await request.validate(UpdateUserValidator)
      const user = await updateUser(id, payload)

      return response.send({ user })
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async destroy({ response, params }) {
    const { id } = params
    destroyUser(id)
    return response.status(204).send(null)
  }
}
