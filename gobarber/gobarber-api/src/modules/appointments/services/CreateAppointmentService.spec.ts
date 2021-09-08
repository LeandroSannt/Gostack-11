import AppError from '@shared/errors/AppErros'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import { CreateAppointmentService } from "./CreateAppointmentService";

describe('CreateAppointment', () => {
  it('isso deve criar um novo appointment',async () =>{

    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

   const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id:'123123'
    })


    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')


  })

  it('não deve ser permitido criar dois appointments no mesmo horario',async () =>{

    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointmentDate = new Date(2020,4,10,11)

   const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id:'123123'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id:'123123'
      })).rejects.toBeInstanceOf(AppError)
  })
})
