// main.ts
import { createApp, seedDatabase } from './bootstrap'
import * as dotenv from 'dotenv'

dotenv.config() // Cargar las variables de entorno desde el archivo .env

async function bootstrap() {
  const app = await createApp()

  await app.listen(3001, async () => {
    console.log('NestJS server listening on port 3001')

    // Opción para ejecutar el seeding
    const shouldSeed = process.env.SEED_DB === 'true'
    if (shouldSeed) {
      await seedDatabase(app)
    }
  })
}

bootstrap()
