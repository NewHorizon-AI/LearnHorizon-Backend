import { Module } from '@nestjs/common'
import { PublicationController } from './controllers/publication.controller'
import { PublicationService } from './services/publication.service'
import { MongooseModule } from '@nestjs/mongoose'

import {
  ArticleModelEntry,
  ArticleModelEntrySchema
} from './schemas/articleModelEntry.schema'
import { GltfFile, GltfFileSchema } from './schemas/gltfFile'
import {
  ModelTransformation,
  ModelTransformationSchema
} from './schemas/modelTransformation.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ArticleModelEntry.name,
        schema: ArticleModelEntrySchema
      },
      {
        name: GltfFile.name,
        schema: GltfFileSchema
      },
      {
        name: ModelTransformation.name,
        schema: ModelTransformationSchema
      }
    ])
  ], // Importar el modelo de la base de datos
  controllers: [PublicationController],
  providers: [PublicationService], // , Object3DService
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class PublicationModule {}
