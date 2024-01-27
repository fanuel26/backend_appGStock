
import Produit from "App/Models/Produit";
import ResponseBody from "App/Models/ResponseBody";
import ProduitRegistrationValidator from "App/Validators/ProduitRegistrationValidator";

export default class ProduitsController {
  public async list({ response }) {
    const produit = await Produit.all();

    /// generation de response
    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = produit;
    responseBody.message = "Liste de produit";
    return response.accepted(responseBody);
  }

  public async save({ request, response }) {
    const data = await request.validate(ProduitRegistrationValidator);

    console.log(data);
    if (data.errors && data.errors?.length != 0) {
      return data;
    }

    const produit = new Produit();
    produit.nom = request.body().nom;

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
      await Produit.query().where('id', request.params().id).update(request.body())

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
