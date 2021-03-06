import 'reflect-metadata';
import  {container} from 'tsyringe'
import '@modules/users/providers'
import "./providers"

import { IAppointmentRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import  IUserRepository  from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
  )

  container.registerSingleton<IUserRepository>(
    'UsersRepository',
    UsersRepository
    )
