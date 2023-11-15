// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import Livraison from 'App/Models/Livraison'
import ProduitAgency from 'App/Models/ProduitAgency'
import ResponseBody from 'App/Models/ResponseBody'
import User from "App/Models/User"
import UserRegistrationValidator from 'App/Validators/UserRegistrationValidator'

export default class AuthController {
  public async login({ auth, request, response }) {
    const email = request.body().email
    const password = request.body().password

    try {
      const user = await User
        .query()
        .where('email', email)
        .firstOrFail()

      // return user

      // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '7 days'
      })

      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = true
      responseBody.data = { token: token, infoUser: user }
      responseBody.message = 'Connexion effectuer avec success'
      return response.accepted(responseBody)
    } catch {
      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = false
      responseBody.data = {}
      responseBody.message = 'erreur lors de la connexion, compte inexistant'
      return response.accepted(responseBody)
    }
  }

  public async listByAgency({ request, response }) {
    const data = await Database.query()
      .from("users")
      .where("id_agence", request.params().id)
    console.log(data)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }


  public async listById({ request, response }) {
    const data = await Database.query()
      .from("users")
      .where("id", request.params().id)
    console.log(data)

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'List des agents avec success'
    return response.accepted(responseBody)
  }

  public async register({ request, response }) {
    const data = await request.validate(UserRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const user = new User()
    user.nom = request.body().nom
    user.email = request.body().email
    user.password = request.body().password
    user.password_review = request.body().password_review
    user.role = request.body().role
    user.id_agence = request.body().id_agence
    user.nom_agence = request.body().nom_agence

    try {
      await user.save()

      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = true
      responseBody.data = user
      responseBody.message = 'Compte créé avec success'
      return response.accepted(responseBody)
    } catch {
      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = false
      responseBody.data = user
      responseBody.message = 'erreur lors de l`\'enregistrement, email existe déjà'
      return response.accepted(responseBody)
    }
  }


  public async Statistique({ response }) {
    const user = await User.all();
    const livraison = await Livraison.all();
    const affectation = await ProduitAgency.all();

    let data = { gerant: user.length, livraison: livraison.length, affectation: affectation.length};

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'Statistique avec success'
    return response.accepted(responseBody)
  }

}
