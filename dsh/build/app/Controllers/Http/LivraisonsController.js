"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Livraison_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Livraison"));
const ProduitAgencyStock_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ProduitAgencyStock"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const LivraisonRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LivraisonRegistrationValidator"));
class LivraisonsController {
    async list({ response }) {
        const produit = await Livraison_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des lot de produit";
        return response.accepted(responseBody);
    }
    async listById({ request, response }) {
        const data = await Database_1.default.query()
            .from("livraisons")
            .where("id", request.params().id);
        const dataSomme = await Database_1.default.query()
            .from("livraisons")
            .where("id", request.params().id).sum('nbr', 'sum');
        console.log(dataSomme);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.dataSecond = dataSomme;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async listByIdGerant({ request, response }) {
        const data = await Database_1.default.query()
            .from("livraisons")
            .where("id_gerant", request.params().id);
        const dataSomme = await Database_1.default.query()
            .from("livraisons")
            .where("id_gerant", request.params().id).sum('nbr', 'sum');
        console.log(dataSomme);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.dataSecond = dataSomme;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async save({ request, response }) {
        const data = await request.validate(LivraisonRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const dataSomme = await Database_1.default.query()
            .from("produit_agency_stocks")
            .where("id_produit_agency", request.body().id_produit_agency).sum('nbr', 'sum');
        console.log(dataSomme[0].sum);
        console.log(request.body().nbr);
        if (parseInt(dataSomme[0].sum) >= parseInt(request.body().nbr)) {
            console.log('coucou');
            const produit = new Livraison_1.default();
            produit.nbr = request.body().nbr;
            produit.id_gerant = request.body().id_gerant;
            produit.id_carnet = request.body().id_carnet;
            produit.id_collecteur = request.body().id_collecteur;
            produit.nom_carnet = request.body().nom_carnet;
            produit.nom_collecteur = request.body().nom_collecteur;
            produit.nom_client = request.body().nom_client;
            produit.numero_client = request.body().numero_client;
            const stock = new ProduitAgencyStock_1.default();
            stock.nbr = request.body().nbr * -1;
            stock.id_produit_agency = request.body().id_produit_agency;
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
            await Livraison_1.default.query().where('id', request.params().id).update(request.body());
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
exports.default = LivraisonsController;
//# sourceMappingURL=LivraisonsController.js.map