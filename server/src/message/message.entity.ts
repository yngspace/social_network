import { ChatEntity } from 'src/chat/chat.entity'
import { UserEntity } from 'src/user/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: false,
    default: new Date()
  })
  createdAtt: Date

  @Column({
    nullable: false
  })
  body: string

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  user: UserEntity

  @ManyToOne(() => ChatEntity, (chat) => chat.id, { onDelete: 'CASCADE' })
  chat: ChatEntity
}
