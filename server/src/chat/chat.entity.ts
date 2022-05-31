import { Exclude } from 'class-transformer'
import { MessageEntity } from 'src/message/message.entity'
import { UserEntity } from 'src/user/user.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => MessageEntity, (message) => message.id, { onDelete: 'CASCADE' })
  message: MessageEntity[]
}
