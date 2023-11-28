"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const ProduitAgencyStock_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ProduitAgencyStock"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const Stock_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Stock"));
const ProduitAgenceStockRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ProduitAgenceStockRegistrationValidator"));
class ProduitAgenceStocksController {
    async list({ response }) {
        const produit = await ProduitAgencyStock_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des lot de produit";
        return response.accepted(responseBody);
    }
    async listById({ request, response }) {
        const data = await Database_1.default.query()
            .from("produit_agency_stocks")
            .where("id_produit_agency", request.params().id);
        const dataSomme = await Database_1.default.query()
            .from("produit_agency_stocks")
            .where("id_produit_agency", request.params().id).sum('nbr', 'sum');
        console.log(dataSomme);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.dataSecond = dataSomme;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async save({ request, response }) {
        const data = await request.validate(ProduitAgenceStockRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const dataSomme = await Database_1.default.query()
            .from("stocks")
            .where("id_carnet", request.body().id_carnet).sum('nbr', 'sum');
        console.log(dataSomme[0].sum);
        if (parseInt(request.body().nbr) <= parseInt(dataSomme[0].sum)) {
            const produit = new ProduitAgencyStock_1.default();
            produit.nbr = request.body().nbr;
            produit.id_produit_agency = request.body().id_produit_agency;
            const stock = new Stock_1.default();
            stock.nbr = request.body().nbr * -1;
            stock.id_carnet = request.body().id_carnet;
            stock.nom_carnet = request.body().nom_carnet;
            try {
                await produit.save();
                await stock.save();
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
        else {
            return response.accepted({
                status: false,
                message: "Vous etes en rupture de stock, veuillez faire des ajout",
            });
        }
    }
    async update({ request, response }) {
        try {
            await ProduitAgencyStock_1.default.query().where('id', request.params().id).update(request.body());
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
exports.default = ProduitAgenceStocksController;
//# sourceMappingURL=ProduitAgenceStocksController.js.map