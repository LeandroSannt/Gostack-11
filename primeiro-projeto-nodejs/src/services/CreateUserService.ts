import {getRepository} from 'typeorm'
import User from '../models/User'

import AppError from '../errors/AppErros'


import {hash} from 'bcryptjs'

interface Request{
  name:string,
  password:string,
  email:string
}
class CreateUserService{
   public async execute({name,email,password}:Request):Promise<User>{
     const usersRepository = getRepository(User)

     const checkUserExists = await usersRepository.findOne({
       where:{email}
     })

     if(checkUserExists){
       throw new AppError("Email addres alread used")
     }

     const hashedPassword = await hash(password,8)

     const user = usersRepository.create({
       name,
       email,
       password: hashedPassword
     })

     await usersRepository.save(user)

     return user

   }

}

export {CreateUserService}
