import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatEntity } from 'src/chat/chat.entity'
import { ChatService } from 'src/chat/chat.service'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { MessageCreatedDto } from './message.dto'
import { MessageEntity } from './message.entity'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly userService: UserService,
    private readonly chatService: ChatService
  ) {}

  async createMessage(userId: string, chatId: string, body: MessageCreatedDto) {
    const user = await this.userService.findById(userId)
    const chat = await this.chatService.findByChatId(chatId)
    const message = await this.repository.save({ body: body.body, user, chat })
    await this.chatService.updateChat(chatId)
    return message
  }

  async deleteMessage(messageId, userId) {
    const message = await this.repository.findOne({ where: { id: messageId }, relations: ['user'] })
    if (message.user.id !== userId) {
      throwHttpException(HttpStatus.FORBIDDEN, 'Это не ваше сообщение')
    }

    await this.repository.delete(message)
    return {
      message: 'Успешно'
    }
  }

  async findAndPagination(chat: ChatEntity, query) {
    const page = parseInt(query.page) || 1
    const perPage = parseInt(query.perPage) || 20
    const [results, count] = await this.repository.findAndCount({
      where: { chat },
      take: perPage,
      skip: page === 1 ? 0 : (page - 1) * perPage,
      order: { createdAtt: 'DESC' },
      relations: ['user']
    })

    return {
      count,
      next: count > (page * perPage),
      prev: page !== 1 ? true : false,
      page,
      perPage,
      results
    }
  }
}
