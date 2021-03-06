import { Request, Response } from "express";

import {container} from 'tsyringe'

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"

const usersRepository = new UsersRepository()

class SessionController {
  async post(request:Request, response:Response){
      const {email,password} = request.body

      const authenticateUser = container.resolve(AuthenticateUserService)

      const {user, token} = await authenticateUser.execute({
        email,
        password
      })

      delete user.password

      return response.json({user,token})
  }
}

export {SessionController}
