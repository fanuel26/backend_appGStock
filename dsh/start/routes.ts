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
    Route.get('/listByAgency/:id', 'AuthController.listByAgency')
    Route.get('/listById/:id', 'AuthController.listById')
    Route.get('/statistique', 'AuthController.Statistique')
  }).prefix('/auth')

  //// stock route
  Route.group(() => {
    Route.get('/list', 'StocksController.list')
    Route.post('/save', 'StocksController.save')
    Route.get('/listByAgency/:id', 'StocksController.listByAgency')
  }).prefix('/stock')


  //// produitAgency route
  Route.group(() => {
    Route.get('/list', 'ProduitAgenciesController.list')
    Route.post('/save', 'ProduitAgenciesController.save')
    Route.get('/listById/:id', 'ProduitAgenciesController.listById')
    Route.get('/listByAgency/:id', 'ProduitAgenciesController.listByAgency')
    Route.get('/listByCarnet/:id', 'ProduitAgenciesController.listByCarnet')
  }).prefix('/affectation')


  //// produitAgency route
  Route.group(() => {
    Route.get('/list', 'ProduitAgenceStocksController.list')
    Route.post('/save', 'ProduitAgenceStocksController.save')
    Route.get('/listById/:id', 'ProduitAgenceStocksController.listById')
  }).prefix('/produit')


  //// livraison route
  Route.group(() => {
    Route.get('/list', 'LivraisonsController.list')
    Route.post('/save', 'LivraisonsController.save')
    Route.get('/listById/:id', 'LivraisonsController.listById')
    Route.get('/listByIdGerant/:id', 'LivraisonsController.listByIdGerant')
  }).prefix('/livraison')

}).prefix('/api')
