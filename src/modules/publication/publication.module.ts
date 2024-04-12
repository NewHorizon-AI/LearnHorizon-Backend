import { Module } from '@nestjs/common'
import { PublicationController } from './publication.controller'
import { PublicationService } from './publication.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Publication, PublicationSchema } from 'src/schemas/publication.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema }
    ])
  ], // Importar el modelo de la base de datos
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class PublicationModule {}
