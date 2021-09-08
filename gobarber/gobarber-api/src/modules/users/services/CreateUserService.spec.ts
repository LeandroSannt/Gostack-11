import AppError from '@shared/errors/AppErros'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from "./CreateUserService";

describe('CreateUser', () => {
  it('isso deve criar um novo User',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

   const user = await createUser.execute({
      name:"Leandro Santos",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })
    expect(user).toHaveProperty('id')
  })

  it('isso nao pode criar um user repetido por email',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

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
