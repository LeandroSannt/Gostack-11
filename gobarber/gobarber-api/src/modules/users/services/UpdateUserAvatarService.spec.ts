import AppError from '@shared/errors/AppErros'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fake/FakeStorageProvider'
import { UpdateUserAvatarService} from "./UpdateUserAvatarService";


describe('UpdateUserAvatar', () => {
  it('isso deve atualizar a foto do avatar',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider)

    const user = await fakeUsersRepository.create({
      name:"leandro",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })

   await updateUserAvatar.execute({
      user_id:user.id,
      avatarFilename:"avatar.jpg"
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('não pode atualizar uma imagem sem avatar',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider)


    expect(updateUserAvatar.execute({
      user_id:'nao existe',
      avatarFilename:"avatar.jpg"
    })).rejects.toBeInstanceOf(AppError)
  })

  it('deve deletar o avatar antigo equanto coloca um novo avatar',async () =>{

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    //verifica se uma função ja foi utilizada
    const deleteFile =jest.spyOn(fakeStorageProvider,'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider)

    const user = await fakeUsersRepository.create({
      name:"leandro",
      email:"lsn_slim@yahoo.com.br",
      password:"123456"
    })

   await updateUserAvatar.execute({
      user_id:user.id,
      avatarFilename:"avatar.jpg"
    })

    await updateUserAvatar.execute({
      user_id:user.id,
      avatarFilename:"avatar2.jpg"
    })


    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
