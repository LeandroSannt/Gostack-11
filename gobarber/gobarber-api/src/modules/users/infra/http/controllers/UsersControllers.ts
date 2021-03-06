import { Request, Response } from "express";
import { CreateUserService } from '@modules/users/services/CreateUserService'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'

import {container} from 'tsyringe'

// const usersRepository = new UsersRepository()

export default class UsersController {
 public async create(request:Request, response:Response): Promise<Response>{
      const {name, email, password} = request.body

      const createUser = container.resolve(CreateUserService)

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
  async create(request:Request, response:Response):Promise<Response>{
    const updatedUserAvatar = container.resolve(UpdateUserAvatarService)

     const user =  await updatedUserAvatar.execute({
        user_id:request.user.id,
        avatarFilename:request.file.filename
      })

      delete user.password

      return response.json(user)
  }

}

export {UpdateAvatarController}
