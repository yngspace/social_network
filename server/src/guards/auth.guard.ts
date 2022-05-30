import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { thorwUnauthError } from 'src/const'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>  {
    const request = context.switchToHttp().getRequest()
    try {
      const authHeader = request.headers?.token ? request.headers.token
      : request.handshake.headers.token ? request.handshake.headers.token
      : thorwUnauthError()

      const [prefix, token] = authHeader.split(' ')
      if (prefix !== 'jwt' || !token) thorwUnauthError()

      const user = this.jwtService.verify(token)
      request.user = user

      return true
    } catch (e) {
      thorwUnauthError()
    }
  }
}
