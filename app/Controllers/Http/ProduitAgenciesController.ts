// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import ProduitAgency from "App/Models/ProduitAgency";
import ResponseBody from "App/Models/ResponseBody";
import ProduitAgencyRegistratorValidator from "App/Validators/ProduitAgencyRegistratorValidator";

export default class ProduitAgenciesController {
  public async list({ response }) {
    const produit = await ProduitAgency.all();

    /// generation de response
    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = produit;
    responseBody.message = "Liste des lot de produit";
    return response.accepted(responseBody);
  }

  public async listById({ request, response }) {
    const data = await Database.query()
      .from("produit_agencies")
      .where("id", request.params().id)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async listByAgency({ request, response }) {
    const data = await Database.query()
      .from("produit_agencies")
      .where("id_agence", request.params().id)
    console.log(data)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    // responseBody.dataSecond = dataSomme
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async listByCarnet({ request, response }) {
    const data = await Database.query()
      .from("produit_agencies")
      .where("id_carnet", request.params().id)

    // const dataSomme = await Database.query()
    //   .from("stocks")
    //   .where("id_carnet", request.params().id).sum('nbr', 'sum')
    // console.log(dataSomme)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    // responseBody.dataSecond = dataSomme
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async save({ request, response }) {
    const data = await request.validate(ProduitAgencyRegistratorValidator);

    console.log(data);
    if (data.errors && data.errors?.length != 0) {
      return data;
    }

    const produit = new ProduitAgency();
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
    } catch {
      return response.accepted({
        status: false,
        data: produit,
        message: "erreur lors de l`'enregistrement!",
      });
    }
  }

  public async update({ request, response }) {
    try {
      await ProduitAgency.query().where('id', request.params().id).update(request.body())

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
