import { Request, Response } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

class SessionController {
  async post(request:Request, response:Response){
      const {email,password} = request.body

      const authenticateUser = new AuthenticateUserService()

      const {user, token} = await authenticateUser.execute({
        email,
        password
      })

      delete user.password

      return response.json({user,token})
  }
}

export {SessionController}
