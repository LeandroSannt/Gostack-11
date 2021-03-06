import 'reflect-metadata';
import {injectable,inject} from 'tsyringe'
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import { IAppointmentRepository } from "../repositories/IAppointmentsRepository";

import AppError from '@shared/errors/AppErros'

import {startOfHour} from 'date-fns'

interface Request{
  provider_id:string
  date:Date
}

@injectable()
class CreateAppointmentService{
  constructor(
    @inject('AppointmentsRepository')

   private appointmentsRepository:IAppointmentRepository,
  ){

  }
  public async execute({date,provider_id}:Request):Promise<Appointment>{

  const appointmentDate = startOfHour(date)

  const findAppointmentInSameDate = await this.appointmentsRepository.findByData(
    appointmentDate,
  )

  if(findAppointmentInSameDate){
    throw new AppError('this appointment is already')
  }

  const appointment = await this.appointmentsRepository.create({
    provider_id,
    date:appointmentDate

  })

  return appointment

  }
}

export  {CreateAppointmentService}
