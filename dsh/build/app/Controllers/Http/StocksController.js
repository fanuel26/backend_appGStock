"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const Stock_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Stock"));
const StockRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/StockRegistrationValidator"));
class StocksController {
    async list({ response }) {
        const produit = await Stock_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des lot de produit";
        return response.accepted(responseBody);
    }
    async listByAgency({ request, response }) {
        const data = await Database_1.default.query()
            .from("stocks")
            .where("id_carnet", request.params().id);
        const dataSomme = await Database_1.default.query()
            .from("stocks")
            .where("id_carnet", request.params().id).sum('nbr', 'sum');
        console.log(dataSomme);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.dataSecond = dataSomme;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async save({ request, response }) {
        const data = await request.validate(StockRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const produit = new Stock_1.default();
        produit.id_carnet = request.body().id_carnet;
        produit.nom_carnet = request.body().nom_carnet;
        produit.nbr = request.body().nbr;
        try {
            await produit.save();
            return response.accepted({
                status: true,
                data: produit,
                message: "produit créé avec success",
            });
        }
        catch {
            return response.accepted({
                status: false,
                data: produit,
                message: "erreur lors de l`'enregistrement!",
            });
        }
    }
    async update({ request, response }) {
        try {
            await Stock_1.default.query().where('id', request.params().id).update(request.body());
            return response.accepted({
                status: true,
                message: "Mise a jour effectuer avec success",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur lors de la mise a jour! level 2",
            });
        }
    }
}
exports.default = StocksController;
//# sourceMappingURL=StocksController.js.map