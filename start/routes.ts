/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.resource('users', 'UsersController').apiOnly() //
// Route.get('users', 'UsersController').apiOnly() //

Route.where('id', Route.matchers.uuid())

Route.group(() => {
  Route.group(() => {
    Route.get('/health', 'HealthController.index')

    Route.group(() => {
      Route.get('/', 'AuthController.index')
    }).prefix('/auth')

    Route.resource('users', 'UserController')
  }).prefix('/v1')
}).prefix('/api')
