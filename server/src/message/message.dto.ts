import { IsNotEmpty } from 'class-validator'

class MessageCreatedDto {
  @IsNotEmpty({
    message: 'Не может быть пустым'
  })
  body: string
}

export { MessageCreatedDto }
