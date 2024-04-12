import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

// import { SeederService } from './seeder'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe()) // Validar los datos que llegan al servidor

  // const seeder = app.get(SeederService)
  // await seeder.seedDatabase()

  await app.listen(3001)
}
bootstrap()
