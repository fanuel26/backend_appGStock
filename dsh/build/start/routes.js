"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.group(() => {
        Route_1.default.post('/login', 'AuthController.login');
        Route_1.default.post('/register', 'AuthController.register');
        Route_1.default.get('/listByAgency/:id', 'AuthController.listByAgency');
        Route_1.default.get('/listById/:id', 'AuthController.listById');
        Route_1.default.get('/statistique', 'AuthController.Statistique');
    }).prefix('/auth');
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'StocksController.list');
        Route_1.default.post('/save', 'StocksController.save');
        Route_1.default.get('/listByAgency/:id', 'StocksController.listByAgency');
    }).prefix('/stock');
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'ProduitAgenciesController.list');
        Route_1.default.post('/save', 'ProduitAgenciesController.save');
        Route_1.default.get('/listById/:id', 'ProduitAgenciesController.listById');
        Route_1.default.get('/listByAgency/:id', 'ProduitAgenciesController.listByAgency');
        Route_1.default.get('/listByCarnet/:id', 'ProduitAgenciesController.listByCarnet');
    }).prefix('/affectation');
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'ProduitAgenceStocksController.list');
        Route_1.default.post('/save', 'ProduitAgenceStocksController.save');
        Route_1.default.get('/listById/:id', 'ProduitAgenceStocksController.listById');
    }).prefix('/produit');
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'LivraisonsController.list');
        Route_1.default.post('/save', 'LivraisonsController.save');
        Route_1.default.get('/listById/:id', 'LivraisonsController.listById');
        Route_1.default.get('/listByIdGerant/:id', 'LivraisonsController.listByIdGerant');
    }).prefix('/livraison');
}).prefix('/api');
//# sourceMappingURL=routes.js.map