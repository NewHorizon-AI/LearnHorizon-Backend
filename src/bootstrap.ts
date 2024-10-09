import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication, ValidationPipe } from '@nestjs/common'
// import { SeederService } from './seeder'

export async function createApp() {
  // * (1) Crear la aplicación de NestJS
  const app = await NestFactory.create(AppModule)

  // * (2) Obtener el servicio ConfigService de la aplicación
  const configService = app.get(ConfigService)

  // * (2) Configurar las dependencias del entorno
  setupEnvDependencies(app, configService)

  // * (3) Configurar la validación de datos
  app.useGlobalPipes(new ValidationPipe())

  // * (4) Configurar la documentación de la API con Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentación de la API LearnHorizon - Backend')
    .setDescription('La API de ejemplo para tu aplicación NestJS')
    .setVersion('0.1')

    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  return { app, port: configService.get('PORT') }
}

export async function setupEnvDependencies(
  app: INestApplication,
  configService: ConfigService
) {
  /*
   * Configurar las dependencias del entorno de la aplicación.
   * Este método se encarga de configurar las dependencias del entorno, como la base de datos y la carga de archivos.
   @Param app: INestApplication - La aplicación de NestJS.
   @Param configService: ConfigService - El servicio ConfigService de la aplicación.
   */

  try {
    console.log('Setting up environment dependencies...')

    // * (1) Validar el puerto de la aplicación
    const port = configService.get('PORT')
    if (!port) {
      throw new Error('PORT environment variable is not defined')
    }

    // * (1) Sembrar la base de datos si la variable de entorno SEED_DB es 'True'
    const shouldSeed = configService.get('SEED_DB') === 'True'
    if (shouldSeed) {
      // await seedDatabase(app)
    }

    // * (3) Configurar la ruta de carga de archivos
    const fileUploadPath = configService.get('UPLOAD_PATH')
    if (!fileUploadPath) {
      throw new Error('UPLOAD_PATH environment variable is not defined')
    }
  } catch (error) {
    // * (2) Mostrar un mensaje de error si ocurre un error durante la configuración de las dependencias del entorno
    throw new Error(
      'Error setting up environment dependencies: ' + error.message
    )
  }
}

// export async function seedDatabase(app: INestApplication<any>) {
//   /*
//    * Obtener el servicio SeederService de la aplicación y ejecutar el método seedDatabase().
//    * Este método se encarga de sembrar la base de datos con datos de prueba.
//    * Si ocurre un error durante la siembra, se captura y se muestra en la consola.
//    */

//   // * (1) Obtener el servicio SeederService de la aplicación
//   // const seeder = app.get(SeederService)
//   try {
//     // * (2) Sembrar la base de datos
//     await seeder.seedDatabase()
//     console.log('Database seeding completed.')
//   } catch (error) {
//     // * (3) Mostrar un mensaje de error si ocurre un error durante la siembra
//     console.error('Error seeding database:', error)
//   }
// }
