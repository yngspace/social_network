import { HttpStatus, UnauthorizedException } from '@nestjs/common'

const SALT = 6

const thorwUnauthError = (): UnauthorizedException => {
  throw new UnauthorizedException({
    status: HttpStatus.FORBIDDEN,
    message: 'Невозможно войти с предоставленными данными',
  })
}

const firstSymbolToUpper = (value: string): string => {
  return value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase()
}

export { SALT, thorwUnauthError, firstSymbolToUpper }
