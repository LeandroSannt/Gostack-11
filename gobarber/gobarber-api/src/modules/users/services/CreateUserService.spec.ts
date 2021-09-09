import AppError from '@shared/errors/AppErros'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import { CreateUserService } from "./CreateUserService";


describe('CreateUser', () => {
  it('isso deve criar um novo User',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider)

   const user = await createUser.execute({
      name:"Leandro Santos",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })
    expect(user).toHaveProperty('id')
  })

  it('isso nao pode criar um user repetido por email',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider)

   const user = await createUser.execute({
      name:"Leandro Santos",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })
    expect(
      createUser.execute({
        name:"Leandro Santos",
        email:"lsn_slim@yahoo.com.br",
        password:"123456"
      })

    ).rejects.toBeInstanceOf(AppError)
  })
})
