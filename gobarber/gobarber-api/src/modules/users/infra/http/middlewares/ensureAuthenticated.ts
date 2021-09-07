import {Request,Response,NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

import AppError from '@shared/errors/AppErros'

import authconfig from '@config/auth'

interface tokenPayload{
  iat:number
  exp:number
  sub:string
}

export default function ensuredAuthenticated(request:Request,response:Response,next:NextFunction): void{

  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError('JWT is missing',401)
  }

  const [,token] = authHeader.split(' ')

  try{
  const decoded = verify(token, authconfig.jwt.secret)

  const { sub } = decoded as tokenPayload

  request.user = {
    id :sub
  }

  return next()

  }catch{
    throw new AppError('Invalid JWT token',401)
  }
}
