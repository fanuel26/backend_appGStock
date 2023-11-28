"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const ProduitAgency_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ProduitAgency"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const ProduitAgencyRegistratorValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ProduitAgencyRegistratorValidator"));
class ProduitAgenciesController {
    async list({ response }) {
        const produit = await ProduitAgency_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des lot de produit";
        return response.accepted(responseBody);
    }
    async listById({ request, response }) {
        const data = await Database_1.default.query()
            .from("produit_agencies")
            .where("id", request.params().id);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async listByAgency({ request, response }) {
        const data = await Database_1.default.query()
            .from("produit_agencies")
            .where("id_agence", request.params().id);
        console.log(data);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async listByCarnet({ request, response }) {
        const data = await Database_1.default.query()
            .from("produit_agencies")
            .where("id_carnet", request.params().id);
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = data;
        responseBody.message = 'List des agents avec success';
        return response.accepted(responseBody);
    }
    async save({ request, response }) {
        const data = await request.validate(ProduitAgencyRegistratorValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const produit = new ProduitAgency_1.default();
        produit.id_carnet = request.body().id_carnet;
        produit.nom_carnet = request.body().nom_carnet;
        produit.id_agence = request.body().id_agence;
        produit.nom_agence = request.body().nom_agence;
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
            await ProduitAgency_1.default.query().where('id', request.params().id).update(request.body());
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
exports.default = ProduitAgenciesController;
//# sourceMappingURL=ProduitAgenciesController.js.map