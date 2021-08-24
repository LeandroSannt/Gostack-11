import { Request, Response } from "express";
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'

class CreateUserController {
  async post(request:Request, response:Response){
      const {name, email, password} = request.body

      const createUser = new CreateUserService()

      const user = await createUser.execute({
        name,
        email,
        password
      })

      delete user.password

      return response.json(user)
  }

}

class UpdateAvatarController{
  async post(request:Request, response:Response){
    const updatedUserAvatar = new UpdateUserAvatarService()

     const user =  await updatedUserAvatar.execute({
        user_id:request.user.id,
        avatarFilename:request.file.filename
      })

      delete user.password

      return response.json(user)
  }

}

export {CreateUserController,UpdateAvatarController}