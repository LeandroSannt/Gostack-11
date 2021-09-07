import Appointment from "../infra/typeorm/entities/Appointment";

export interface IAppointmentRepository {
  findByData(date:Date) : Promise<Appointment | undefined>;
}


