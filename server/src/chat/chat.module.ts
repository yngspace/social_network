import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageModule } from 'src/message/message.module'
import { UserModule } from 'src/user/user.module'
import { ChatController } from './chat.controller'
import { ChatEntity } from './chat.entity'
import { ChatService } from './chat.service'

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), UserModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}
