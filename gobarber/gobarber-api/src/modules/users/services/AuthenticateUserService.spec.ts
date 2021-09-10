import AppError from '@shared/errors/AppErros'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import  AuthenticateUserService from "./AuthenticateUserService";
import{ CreateUserService} from "./CreateUserService";

describe('CreateUser', () => {
  it('o usuario esta autenticado',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider)

    const user = await createUser.execute({
      name:"leandro",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })

   const response = await authenticateUser.execute({
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })
    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('não pode autenticar usuario q nao existe',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider)

    expect(authenticateUser.execute({
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Não pode logar com usuario com a senha errada',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider)

    await createUser.execute({
      name:"leandro",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })


    expect(authenticateUser.execute({
      email:"lsn_slim@yahoo.com.br",
      password:"rhggerg"
    })).rejects.toBeInstanceOf(AppError)
  })
})
