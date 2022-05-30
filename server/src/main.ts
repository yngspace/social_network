import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.API_PORT || 9000
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT)
}
bootstrap()
