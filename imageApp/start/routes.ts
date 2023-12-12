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

Route.group(() => {
  //// authetication route
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.get('/list', 'AuthController.list')
  }).prefix('/auth')

  //// carnets route
  Route.group(() => {
    Route.get('/list', 'CarnetsController.list')
    Route.get('/makeShared/:id', 'CarnetsController.makeShared')
    Route.get('/nbrShared/:id', 'CarnetsController.nbrShared')
    Route.post('/save', 'CarnetsController.save')
    Route.get('/listById/:id', 'CarnetsController.listById')
    Route.get('/files/:id', 'CarnetsController.showFile')
  }).prefix('/carnet')



}).prefix('/api')
