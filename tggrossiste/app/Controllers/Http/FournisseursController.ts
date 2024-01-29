// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Fournisseur from "App/Models/Fournisseur";
import ResponseBody from "App/Models/ResponseBody";
import FournisseurRegistrationValidator from "App/Validators/FournisseurRegistrationValidator";

export default class FournisseursController {
  public async list({ response }) {
    const produit = await Fournisseur.all();

    /// generation de response
    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = produit;
    responseBody.message = "Liste des fournisseur";
    return response.accepted(responseBody);
  }


  public async listByProduit({ request, response }) {
    const data = await Database.query()
      .from("fournisseurs")
      .where("id_produit", request.params().id)


    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'List des fournisseur avec success'
    return response.accepted(responseBody)
  }

  public async save({ request, response }) {
    const data = await request.validate(FournisseurRegistrationValidator);

    console.log(data);
    if (data.errors && data.errors?.length != 0) {
      return data;
    }

    const produit = new Fournisseur();
    produit.nom = request.body().nom;
    produit.num_first = request.body().num_first;
    produit.num_second = request.body().num_second;
    produit.prix = request.body().prix;
    produit.lieu = request.body().lieu;
    produit.id_produit = request.body().id_produit;

    try {
      await produit.save();

      return response.accepted({
        status: true,
        data: produit,
        message: "Fournisseur créé avec success",
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
      await Fournisseur.query().where('id', request.params().id).update(request.body())

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
