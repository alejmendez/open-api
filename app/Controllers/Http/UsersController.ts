import UserService from 'App/Services/UsersService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  protected userService
  constructor() {
    this.userService = new UserService()
  }

  public async index({ request }) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await this.userService.paginatedList(page, limit)

    return users.toJSON()
  }

  public async show({ params }) {
    const { id } = params
    const user = await this.userService.getOne(id)
    return user
  }

  public async store({ request, response }) {
    const payload = await request.validate(CreateUserValidator)
    const user = await this.userService.create(payload)

    return response.status(201).send(user)
  }

  public async update({ request, response, params }) {
    const { id } = params
    const payload = await request.validate(UpdateUserValidator)
    const user = await this.userService.update(id, payload)

    return response.send(user)
  }

  public async destroy({ response, params }) {
    const { id } = params
    await this.userService.delete(id)
    return response.status(204).send(null)
  }
}
