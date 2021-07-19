import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

import {startOfHour} from 'date-fns'

import {getCustomRepository} from 'typeorm'

interface Request{
  provider:string
  date:Date
}

class CreateAppointmentService{
  public async execute({date,provider}:Request):Promise<Appointment>{
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointmentDate = startOfHour(date)

  const findAppointmentInSameDate = await appointmentsRepository.findByData(
    appointmentDate,
  )

  if(findAppointmentInSameDate){
    throw Error('this appointment is already')
  }

  const appointment = appointmentsRepository.create({
    provider,
    date:appointmentDate

  })

  await appointmentsRepository.save(appointment)

  return appointment

  }
}

export  {CreateAppointmentService}
