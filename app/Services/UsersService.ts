import User from 'App/Models/User'

export default class UserService {
  public async paginatedList(page, limit) {
    const users = await User.query().select('id', 'username', 'email').paginate(page, limit)
    return users
  }

  public async getOne(id) {
    return await User.findOrFail(id)
  }

  public async create(data) {
    return await User.create(data)
  }

  public async update(id, data) {
    const user = await this.getOne(id)
    return await user.merge(data).save()
  }

  public async delete(id) {
    const user = await this.getOne(id)
    return await user.delete()
  }
}
