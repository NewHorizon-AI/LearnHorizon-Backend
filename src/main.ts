import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SeederService } from './seeder'
import * as dotenv from 'dotenv'

dotenv.config() // Cargar las variables de entorno desde el archivo .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe()) // Validar los datos que llegan al servidor

  await app.listen(3001, async () => {
    console.log('NestJS server listening on port 3001')

    // Opción para ejecutar el seeding
    const shouldSeed = process.env.SEED_DB === 'true'
    if (shouldSeed) {
      await seedDatabase(app)
    }
  })
}

async function seedDatabase(app) {
  const seeder = app.get(SeederService)
  try {
    await seeder.seedDatabase()
    console.log('Database seeding completed.')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

bootstrap()
