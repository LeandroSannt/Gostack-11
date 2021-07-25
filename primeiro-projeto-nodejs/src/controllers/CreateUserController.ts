import { Request, Response } from "express";
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'

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
      const updatedUserAvatar = new UpdateUserAvatarService()

     const user =  await updatedUserAvatar.execute({
        user_id:request.user.id,
        avatarFilename:request.file.filename
      })

      delete user.password

      return response.json(user)
    }catch(err){
      return response.status(400).json({error:err.message})
    }
  }

}

export {CreateUserController,UpdateAvatarController}
