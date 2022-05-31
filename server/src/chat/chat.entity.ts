import { Exclude } from 'class-transformer'
import { UserEntity } from 'src/user/user.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({
    nullable: false,
    default: new Date()
  })
  updatedAtt: Date

  @ManyToMany(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  users: UserEntity[]
}
