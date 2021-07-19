import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { v4 as uuid } from "uuid";

@Entity('appointments')
class Appointment{
  @PrimaryGeneratedColumn('uuid')
  id : string

  @Column()
  provider: string

  @Column('timestamp with time zone')
  date: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Appointment
