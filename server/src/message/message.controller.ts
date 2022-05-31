import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { MessageCreatedDto } from './message.dto'
import { MessageService } from './message.service'

@Controller('api/message')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  createMessage(@Req() { user }, @Param() { id }, @Body() body: MessageCreatedDto) {
    const { id: userId } = user
    return this.service.createMessage(userId, id, body)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  deleteMessage(@Param() { id }, @Req() { user }) {
    const { id: UserId } = user
    return this.service.deleteMessage(id, UserId)
  }
}
