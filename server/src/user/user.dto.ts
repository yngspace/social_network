import { isEmail, IsEmail, IsNotEmpty, MinLength } from 'class-validator'

class UserCreateDto {
  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  @MinLength(2, {
    message: 'Не меньше 2 символов'
  })
  firstName: string
  
  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  @MinLength(2, {
    message: 'Не меньше 2 символов'
  })
  lastName: string
  
  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  @IsEmail(isEmail, {
    message: 'Не валидный почтовый адрес'
  })
  email: string
  
  @IsNotEmpty({
    message: 'Не может быть пустым'
  })

  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  @MinLength(5, {
    message: 'Не меньше 5 символов'
  })
  password: string
}

class UserLoginDto {
  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  @IsEmail(isEmail, {
    message: 'Не валидный почтовый адрес'
  })
  email: string

  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  @MinLength(5, {
    message: 'Не меньше 5 символов'
  })
  password: string
}

export { UserCreateDto, UserLoginDto }
