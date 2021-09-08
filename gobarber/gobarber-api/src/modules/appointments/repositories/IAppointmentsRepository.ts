import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'

export interface IAppointmentRepository {
  create(data:ICreateAppointmentDTO): Promise<Appointment>;
  findByData(date:Date) : Promise<Appointment | undefined>;
}


