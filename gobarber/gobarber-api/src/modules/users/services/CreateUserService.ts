import User from '../infra/typeorm/entities/User'

import  IUsersRepository  from "../repositories/IUsersRepository";


import AppError from '@shared/errors/AppErros'

import {hash} from 'bcryptjs'

interface Request{
  name:string,
  password:string,
  email:string
}
class CreateUserService{

  constructor(
    private usersRepository:IUsersRepository,
   ){
   }
   public async execute({name,email,password}:Request):Promise<User>{

     const checkUserExists = await this.usersRepository.findByEmail(email)

     if(checkUserExists){
       throw new AppError("Email addres alread used")
     }

     const hashedPassword = await hash(password,8)

     const user = await this.usersRepository.create({
       name,
       email,
       password: hashedPassword
     })

     return user

   }

}

export {CreateUserService}

