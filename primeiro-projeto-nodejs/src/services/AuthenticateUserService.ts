import {getRepository} from 'typeorm'
import User from '../models/User'
import authconfig from '../config/auth'
import AppError from '../errors/AppErros'

import {sign} from 'jsonwebtoken'

import {compare} from 'bcryptjs'

interface Request{
  email:string
  password:string
}

interface Response{
  user:User;
  token:string
}

class AuthenticateUserService{
  public async execute({ email, password}:Request):Promise<Response>{
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({where:{email}})

    if(!user){
      throw new AppError('not user',401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination',401)

    }

    const token = sign({}, authconfig.jwt.secret,{
      subject:user.id,
      expiresIn: authconfig.jwt.expiresIn,
    })


    return{
      user,
      token
    }

  }
}

export default AuthenticateUserService
