import { HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { UserCreateDto, UserLoginDto } from './user.dto'
import { UserEntity } from './user.entity'
import * as bcrypt from 'bcrypt'
import { firstSymbolToUpper, SALT } from 'src/const'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { isUUID } from 'class-validator'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async findAllUser(query) {
    const { search } = query
    const page = parseInt(query.page) || 1
    const perPage = parseInt(query.perPage) || 9
    const params: { [key: string]: any } = {}

    if (isUUID(search)) {
      params.id = Like(`%${search}%`)
    } else {
      if (!search.includes(' ')) {
        params.firstName = Like(`%${firstSymbolToUpper(search)}%`)
      } else {
        const [firstName, lastName] = search.split(' ')
        params.firstName = Like(`%${firstSymbolToUpper(firstName)}%`)
        params.lastName = Like(`%${firstSymbolToUpper(lastName)}%`)
      }
    }

    const [results, count] = await this.repository.findAndCount({
      take: perPage,
      skip: page === 1 ? 0 : (page - 1) * perPage,
      where: params
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

  async findById(id: string): Promise<UserEntity> {
    if (!isUUID(id, 'all')) {
      throwHttpException(HttpStatus.BAD_REQUEST, 'Не валидный id')
    }

    const user = await this.repository.findOne({ where: { id } })
    if (!user) {
      throwHttpException(HttpStatus.NOT_FOUND, 'Не найдено')
    }

    return user
  }

  async login(body: UserLoginDto) {
    const { password, email } = body
    const user = await this.repository.findOne({ where: { email } })
    if (!user) {
      throwHttpException(HttpStatus.NOT_FOUND, 'Пользователь с указанным email не найден')
    }

    if (!await bcrypt.compare(password, user.password)) {
      throwHttpException(HttpStatus.BAD_REQUEST, 'BAD REQUEST', { password: 'Неверный пароль' })
    }

    return this.generateToken(user)
  }

  async createUser(body: UserCreateDto) {
    const { password, email, firstName, lastName } = body
    const checkEmail = await this.repository.findOne({ where: { email } })
    if (checkEmail) {
      throwHttpException(HttpStatus.BAD_REQUEST, 'BAD REQUEST',
        { email: 'Пользователь с указанным email уже существует' }
      )
    }

    const hashPassword = await bcrypt.hash(password, SALT)
    const user = await this.repository.save({
      ...body,
      password: hashPassword,
      firstName: firstSymbolToUpper(firstName),
      lastName: firstSymbolToUpper(lastName)
    })

    return this.generateToken(user)
  }

  async deleteUser(id: string) {
    const user = await this.findById(id)
    await this.repository.delete(user)

    return {
      message: 'Пользователь удален'
    }
  }

  async generateToken(user: UserEntity) {
    const payload = { id: user.id, email: user.email }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
