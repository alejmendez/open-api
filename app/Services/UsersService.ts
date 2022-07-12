import User from 'App/Models/User'

const paginatedListUser = async (page, limit) => {
  const users = await User.query().select('id', 'username', 'email').paginate(page, limit)
  return users
}

const getOneUser = async (id) => {
  return await User.findOrFail(id)
}

const createUser = async (data) => {
  const user = await User.create(data)
  return user
}

const updateUser = async (id, data) => {
  const user = await getOneUser(id)
  return await user.merge(data).save()
}

const destroyUser = async (id) => {
  const user = await getOneUser(id)
  return user.delete()
}

export { paginatedListUser, getOneUser, createUser, updateUser, destroyUser }
