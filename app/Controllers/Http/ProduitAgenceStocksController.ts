// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import ProduitAgencyStock from "App/Models/ProduitAgencyStock";
import ResponseBody from "App/Models/ResponseBody";
import Stock from "App/Models/Stock";
import ProduitAgenceStockRegistrationValidator from "App/Validators/ProduitAgenceStockRegistrationValidator";

export default class ProduitAgenceStocksController {
  public async list({ response }) {
    const produit = await ProduitAgencyStock.all();

    /// generation de response
    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = produit;
    responseBody.message = "Liste des lot de produit";
    return response.accepted(responseBody);
  }


  public async listById({ request, response }) {
    const data = await Database.query()
      .from("produit_agency_stocks")
      .where("id_produit_agency", request.params().id)

    const dataSomme = await Database.query()
      .from("produit_agency_stocks")
      .where("id_produit_agency", request.params().id).sum('nbr', 'sum')
    console.log(dataSomme)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.dataSecond = dataSomme
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async save({ request, response }) {
    const data = await request.validate(ProduitAgenceStockRegistrationValidator);

    console.log(data);
    if (data.errors && data.errors?.length != 0) {
      return data;
    }

    const dataSomme = await Database.query()
      .from("stocks")
      .where("id_carnet", request.body().id_carnet).sum('nbr', 'sum')
    console.log(dataSomme[0].sum)

    if (parseInt(request.body().nbr) <= parseInt(dataSomme[0].sum)) {
      const produit = new ProduitAgencyStock();
      produit.nbr = request.body().nbr;
      produit.id_produit_agency = request.body().id_produit_agency;

      const stock = new Stock();
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
      } catch {
        return response.accepted({
          status: false,
          data: produit,
          message: "erreur lors de l`'enregistrement!",
        });
      }
    } else {
      return response.accepted({
        status: false,
        message: "Vous etes en rupture de stock, veuillez faire des ajout",
      });
    }

  }

  public async update({ request, response }) {
    try {
      await ProduitAgencyStock.query().where('id', request.params().id).update(request.body())

      return response.accepted({
        status: true,
        message: "Mise a jour effectuer avec success",
      });
    } catch {
      return response.accepted({
        status: false,
        message: "erreur lors de la mise a jour! level 2",
      });
    }
  }
}
