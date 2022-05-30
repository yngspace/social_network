import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: false
  })
  firstName: string

  @Column({
    nullable: false
  })
  lastName: string

  @Column({
    nullable: false,
    unique: true
  })
  email: string

  @Column({
    nullable: false
  })
  @Exclude()
  password: string
}
