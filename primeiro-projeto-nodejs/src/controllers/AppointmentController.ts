import { Request, Response } from "express";
import { CreateAppointmentService } from '../services/CreateAppointmentService'

import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

import {parseISO} from 'date-fns'

class CreateAppointmentController {
  async post(request:Request, response:Response){
    try{

      const {provider_id,date} = request.body

      const parsedDate = parseISO(date)

      const createAppointment = new CreateAppointmentService()

      const appointment = await createAppointment.execute({
        date:parsedDate,
        provider_id
      })

      return response.json(appointment)

    }catch(err){

      return response.status(400).json({error:err.message})
    }
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
