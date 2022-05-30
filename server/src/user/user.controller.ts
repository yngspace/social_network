import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { UserCreateDto, UserLoginDto } from './user.dto'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Controller('/api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findRequestingUser(@Req() { user }): Promise<UserEntity> {
    const id = user
    return this.findOneUser(id)
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOneUser(@Param() { id } ): Promise<any> {
    return this.service.findById(id)
  }

  @Post('/login')
  login(@Body() body: UserLoginDto): Promise<any> {
    return this.service.login(body)
  }

  @Post('/registration')
  createUser(@Body() body: UserCreateDto): Promise<any> {
    return this.service.createUser(body)
  }

  @Delete('/me')
  @UseGuards(AuthGuard)
  deleteUser(@Req() { user }) {
    const id = user.id
    return this.service.deleteUser(id)
  }
}
