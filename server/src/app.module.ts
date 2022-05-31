import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from './user/user.module'
import { EventModule } from './events/event.module'
import { ChatModule } from './chat/chat.module'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    UserModule,
    ChatModule,
    EventModule
  ],
  exports: [JwtModule]
})
export class AppModule {}
