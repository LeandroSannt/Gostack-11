import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

import AppError from '../errors/AppErros'


import {startOfHour} from 'date-fns'

import {getCustomRepository} from 'typeorm'

interface Request{
  provider_id:string
  date:Date
}

class CreateAppointmentService{
  public async execute({date,provider_id}:Request):Promise<Appointment>{
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointmentDate = startOfHour(date)

  const findAppointmentInSameDate = await appointmentsRepository.findByData(
    appointmentDate,
  )

  if(findAppointmentInSameDate){
    throw new AppError('this appointment is already')
  }

  const appointment = appointmentsRepository.create({
    provider_id,
    date:appointmentDate

  })

  await appointmentsRepository.save(appointment)

  return appointment

  }
}

export  {CreateAppointmentService}
