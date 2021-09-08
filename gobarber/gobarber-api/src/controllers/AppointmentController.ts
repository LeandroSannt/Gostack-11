import { Request, Response } from "express";
import { CreateAppointmentService } from '@modules/appointments/services/CreateAppointmentService'
import {container} from 'tsyringe'


import {parseISO} from 'date-fns'

// const appointmentsRepository = new AppointmentsRepository()

class CreateAppointmentController {

  async post(request:Request, response:Response){

      const {provider_id,date} = request.body

      const parsedDate = parseISO(date)

      const createAppointment = container.resolve(CreateAppointmentService)

      const appointment = await createAppointment.execute({
        date:parsedDate,
        provider_id
      })

      return response.json(appointment)
  }
}

// class GetAppointmentController{
//   async list(request:Request, response:Response){

//     const appointments = await appointmentsRepository.find()

//     return response.json(appointments)

//   }

// }

export {CreateAppointmentController}
