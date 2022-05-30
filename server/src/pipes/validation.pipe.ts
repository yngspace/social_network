import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        'BAD REQUEST',
        this.buildError(errors)
      )
    }

    return value
  }

  private buildError(errors) {
    const result = {}

    errors.forEach((error) => {
      const prop = error.property
      Object.entries(error.constraints).forEach((constraint) => {
        result[prop] = constraint[1]
      })
    })

    return result
  }
}

interface IResponse {
  status: HttpStatus
  message: string
  errors?: { [code: string]: string }
}

const throwHttpException = (
  status: HttpStatus = 400,
  message: string,
  errors?: { [code: string]: string }
): HttpException => {
  const response: IResponse = { status, message }
  if (errors) response.errors = errors

  throw new HttpException(response, status)
}

export { ValidationPipe, throwHttpException }
