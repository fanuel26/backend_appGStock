
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'
import Database from "@ioc:Adonis/Lucid/Database";
import Carnet from "App/Models/Carnet";
import ResponseBody from "App/Models/ResponseBody";
import Shared from 'App/Models/Shared';
import CarnetRegistrationValidator from "App/Validators/CarnetRegistrationValidator";
const { exec } = require('child_process');

export default class CarnetsController {
  public async list({ response }) {
    const carnet = await Carnet.all();

    /// generation de response
    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = carnet;
    responseBody.message = "Liste des lot de carnet";
    return response.accepted(responseBody);
  }


  public async listById({ request, response }) {
    const data = await Database.query()
      .from("carnets")
      .where("id", request.params().id)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async showFile({ params, response }) {
    const file = await Carnet.findOrFail(params.id)

    // Construire le chemin complet du fichier
    const filePath = Application.publicPath(file.image)

    console.log(filePath)
    // Afficher le fichier en tant que réponse
    return response.download(filePath)
  }

  public async deleteFile({ params, response }) {
    const file = await Carnet.findOrFail(params.id)

    // Construire le chemin complet du fichier
    const filePath = Application.publicPath(file.image)

    console.log(filePath)
    // Afficher le fichier en tant que réponse
    const commandToRun = `rm ${filePath}`;

    exec(commandToRun, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }

      console.log(`Command output: ${stdout}`);
      console.error(`Command errors: ${stderr}`);

    });

    try {
      await file.delete()
      return response.accepted({
        status: true,
        message: "Fichier retirer avec success",
      });
    } catch (error) {

      return response.accepted({
        status: false,
        message: "Fichier retirer a echoué",
      });
    }
  }



  public async makeShared({ request, response }) {
    let data = await Database.query()
      .from("shareds")
      .where("id_carnet", request.params().id).first()

    let nbr = data.nbr + 1
    try {
      await Shared.query().where('id_carnet', request.params().id).update({ nbr: nbr })

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

  public async save({ request, response }) {
    console.log(request.file('image'))
    const data = await request.validate(CarnetRegistrationValidator);
    const image = request.file('image')

    let nameImage = `${new Date().getTime()}.${image.extname}`

    if (data.errors && data.errors?.length != 0) {
      return data;
    }

    await image.move(Application.publicPath('uploads'), {
      name: nameImage,
      overwrite: true
    })
    const carnet = new Carnet();
    carnet.libelle = request.body().libelle;
    carnet.prix = request.body().prix;
    carnet.image = `uploads/${nameImage}`;



    try {
      await carnet.save();

      const shared = new Shared();
      shared.id_carnet = carnet.id;
      shared.nbr = 0

      try {
        await shared.save();

        return response.accepted({
          status: true,
          data: carnet,
          message: "carnet créé avec success",
        });
      } catch {
        return response.accepted({
          status: false,
          data: carnet,
          message: "erreur lors de l`'enregistrement!",
        });
      }
    } catch {
      return response.accepted({
        status: false,
        data: carnet,
        message: "erreur lors de l`'enregistrement!",
      });
    }

  }

  public async nbrShared({ request, response }) {
    let data = await Database.query()
      .from("shareds")
      .where("id_carnet", request.params().id).first()

    const responseBody = new ResponseBody();
    responseBody.status = true;
    responseBody.data = data;
    responseBody.message = "Liste des lot de carnet";
    return response.accepted(responseBody);
  }


  public async update({ request, response }) {
    try {
      await Carnet.query().where('id', request.params().id).update(request.body())

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
