import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { ChatService } from './chat.service'

@Controller('/api/chat')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAllChats (@Req() { user }, @Query() query) {
    const id: string = user.id
    return this.service.findAllChats(id, query)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findByChatId(@Param() { id }, @Query() query) {
    return this.service.findByChatIdWithMessages(id, query)
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  createChat(@Param() { id: target }, @Req() { user }) {
    const sender = user.id
    return this.service.createChat(target, sender)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteChat(@Param() { id }, @Req() { user }) {
    const userId = user.id
    return this.service.deleteChat(id, userId)
  }
}
