import { Request, Response } from "express";
import { CreateAppointmentService } from '@modules/appointments/services/CreateAppointmentService'

import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository'

import {parseISO} from 'date-fns'

class CreateAppointmentController {
  async post(request:Request, response:Response){

      const {provider_id,date} = request.body

      const parsedDate = parseISO(date)

      const createAppointment = new CreateAppointmentService()

      const appointment = await createAppointment.execute({
        date:parsedDate,
        provider_id
      })

      return response.json(appointment)
  }
}

class GetAppointmentController{
  async list(request:Request, response:Response){
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointments = await appointmentsRepository.find()

    return response.json(appointments)

  }

}

export {CreateAppointmentController, GetAppointmentController}
