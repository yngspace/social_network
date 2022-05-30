import { Body, Inject, Req, UseGuards } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AuthGuard } from 'src/guards/auth.guard'

@WebSocketGateway(3001, { cors: true })
export class EventGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  // @Inject()
  // private readonly messageService: MessageService
  // private readonly chatService: ChatService

  @WebSocketServer()
  private wss: Server

  @UseGuards(AuthGuard)
  handleConnection(client, data, @Req() req): void {
    this.wss.emit('connection', { connection: 'ok' })
  }

  handleDisconnect(): void {
    this.wss.emit('disconect', 'bye')
  }

  afterInit(): void {
    console.log('message gateway init')
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('msgToServer')
  handleMessage(@Body() body, @Req() req): void {
    this.wss.emit('msgToClient', body)
  }
}
