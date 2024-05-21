// bootstrap.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { SeederService } from './seeder'
import * as dotenv from 'dotenv'

dotenv.config() // Cargar las variables de entorno desde el archivo .env

export async function createApp() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe()) // Validar los datos que llegan al servidor

  const config = new DocumentBuilder()
    .setTitle('Documentación de la API')
    .setDescription('La API de ejemplo para tu aplicación NestJS')
    .setVersion('1.0')
    .addTag('ejemplo')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  return app
}

export async function seedDatabase(app) {
  const seeder = app.get(SeederService)
  try {
    await seeder.seedDatabase()
    console.log('Database seeding completed.')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
