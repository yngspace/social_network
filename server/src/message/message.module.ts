import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatModule } from 'src/chat/chat.module'
import { UserModule } from 'src/user/user.module'
import { MessageController } from './message.controller'
import { MessageEntity } from './message.entity'
import { MessageService } from './message.service'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), UserModule, ChatModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}
