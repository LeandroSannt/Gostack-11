import { Request, Response } from "express";
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
  async post(request:Request, response:Response){
    try{
      const {name, email, password} = request.body

      const createUser = new CreateUserService()

      const user = await createUser.execute({
        name,
        email,
        password
      })

      delete user.password

      return response.json(user)

    }catch(err){

      return response.status(400).json({error:err.message})
    }
  }

}

class UpdateAvatarController{
  async post(request:Request, response:Response){
    try{

      console.log(request.file)

      return response.json({ok:true})

    }catch(err){
      return response.status(400).json({error:err.message})
    }
  }

}

export {CreateUserController,UpdateAvatarController}
