import Route from '@ioc:Adonis/Core/Route'

Route.where('id', /^[a-z0-9]{25}$/)

Route.group(() => {
  Route.group(() => {
    Route.get('/health', 'HealthController.index')

    Route.post('/auth', 'AuthController.index')
    Route.get('/logout', 'AuthController.logout')

    Route.group(() => {
      Route.resource('users', 'UsersController').apiOnly()
    }).middleware('auth:api')
  })
}).prefix('/api')
