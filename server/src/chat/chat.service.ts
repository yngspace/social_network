import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isUUID } from 'class-validator'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { ChatEntity } from './chat.entity'

const serializer = (items: ChatEntity[]) => {
  return items.map(item => {
    return {
      ...item,
      users: item.users.map(x => {
        return {
          id: x.id,
          firstName: x.firstName,
          lastName: x.lastName
        }
      }
    )}
  })
}

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly repository: Repository<ChatEntity>,
    private readonly userService: UserService
  ) {}

  async findAllChats(id: string, query) {
    const user = await this.userService.findById(id)
    const page = parseInt(query.page) || 1
    const perPage = parseInt(query.perPage) || 20
    const params: { [key: string]: any } = {}
    params.users = user

    const [results, count] = await this.repository.findAndCount({
      take: perPage,
      skip: page === 1 ? 0 : (page - 1) * perPage,
      where: { users: user },
      order: { updatedAtt: 'DESC' }
    })

    return {
      count,
      next: count > (page * perPage),
      prev: page !== 1 ? true : false,
      page,
      perPage,
      results: serializer(results)
    }
  }

  async findByChatId(chatId, userId) {
    const chat = await this.repository.findOne({ where: { id: chatId } })
    return chat
  }

  async createChat(target: string, sender: string) {
    if (!isUUID(target, 'all')) {
      throwHttpException(HttpStatus.BAD_REQUEST, 'Не валидный id')
    }

    const targetUser = await this.userService.findById(target)
    const senderUser = await this.userService.findById(sender)
    if (!targetUser || !senderUser) {
      throwHttpException(HttpStatus.NOT_FOUND, 'Не найдено')
    }

    return this.repository.save({ users: [targetUser, senderUser] })
  }

  async deleteChat(chatId, userId) {
    if (!isUUID(chatId, 'all')) {
      throwHttpException(HttpStatus.BAD_REQUEST, 'Не валидный id')
    }

    const chat = await this.repository.findOne({
      where: { id: chatId }
    })

    if (!chat) {
      throwHttpException(HttpStatus.NOT_FOUND, 'Не найдено')
    }

    const checkIncludesUser = chat.users?.filter((x) => x.id === userId)
    if (!checkIncludesUser.length) {
      throwHttpException(HttpStatus.FORBIDDEN, 'Нельзя удалить этот чат')
    }

    await this.repository.delete({ id: chat.id, updatedAtt: chat.updatedAtt })
    return { message: 'Успешно' }
  }

  async updateChat(id: string) {
    if (!isUUID(id, 'all')) throwHttpException(HttpStatus.BAD_REQUEST, 'Не валидный id')
    const chat = await this.repository.findOne({ where: { id } })
    if (!chat) throwHttpException(HttpStatus.NOT_FOUND, 'Не найдено')
    return this.repository.save({
      ...chat,
      updatedAtt: new Date()
    })
  }
}
