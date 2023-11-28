// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Livraison from "App/Models/Livraison";
import ProduitAgencyStock from "App/Models/ProduitAgencyStock";
import ResponseBody from "App/Models/ResponseBody";
import LivraisonRegistrationValidator from "App/Validators/LivraisonRegistrationValidator";

export default class LivraisonsController {
  public async list({ response }) {
    const produit = await Livraison.all();

    /// generation de response
    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = produit;
    responseBody.message = "Liste des lot de produit";
    return response.accepted(responseBody);
  }


  public async listById({ request, response }) {
    const data = await Database.query()
      .from("livraisons")
      .where("id", request.params().id)

    const dataSomme = await Database.query()
      .from("livraisons")
      .where("id", request.params().id).sum('nbr', 'sum')
    console.log(dataSomme)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.dataSecond = dataSomme
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async listByIdGerant({ request, response }) {
    const data = await Database.query()
      .from("livraisons")
      .where("id_gerant", request.params().id)

    const dataSomme = await Database.query()
      .from("livraisons")
      .where("id_gerant", request.params().id).sum('nbr', 'sum')
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
    const data = await request.validate(LivraisonRegistrationValidator);

    console.log(data);
    if (data.errors && data.errors?.length != 0) {
      return data;
    }

    const dataSomme = await Database.query()
      .from("produit_agency_stocks")
      .where("id_produit_agency", request.body().id_produit_agency).sum('nbr', 'sum')
    console.log(dataSomme[0].sum)
    console.log(request.body().nbr)

    if (parseInt(dataSomme[0].sum) >= parseInt(request.body().nbr)) {
      console.log('coucou')
      const produit = new Livraison();
      produit.nbr = request.body().nbr;
      produit.id_gerant = request.body().id_gerant;
      produit.id_carnet = request.body().id_carnet;
      produit.id_collecteur = request.body().id_collecteur;
      produit.nom_carnet = request.body().nom_carnet;
      produit.nom_collecteur = request.body().nom_collecteur;
      produit.nom_client = request.body().nom_client;
      produit.numero_client = request.body().numero_client;

      const stock = new ProduitAgencyStock();
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
      await Livraison.query().where('id', request.params().id).update(request.body())

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
