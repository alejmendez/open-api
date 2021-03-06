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

Route.where('id', /^[a-z0-9]{25}$/)

Route.group(() => {
  Route.group(() => {
    Route.get('/health', 'HealthController.index')

    Route.post('/auth', 'AuthController.index')
    Route.get('/logout', 'AuthController.logout')

    Route.group(() => {
      Route.resource('users', 'UsersController').apiOnly()
    })
    //.middleware('auth:api')
  }).prefix('/v1')
}).prefix('/api')
