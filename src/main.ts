import { createApp } from './bootstrap'

async function main() {
  /*
   * Crear la aplicación de NestJS y ejecutarla en el puerto 3001.
   * Si la variable de entorno SEED_DB es 'True', se ejecuta el seeding de la base de datos.
   */

  const { app, port } = await createApp()

  // * (1) Iniciar la aplicación en el puerto especificado
  await app.listen(port, async () => {
    console.log(`NestJS server listening on port ${port}`)
  })
}

main()
