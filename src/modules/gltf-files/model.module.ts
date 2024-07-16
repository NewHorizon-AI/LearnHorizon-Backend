import { Module } from '@nestjs/common'
import { ModelController } from './controllers/model.controller.ts.js'
import { ModelService } from './services/model.service.ts.js'
import { MongooseModule } from '@nestjs/mongoose'

import {
  ArticleModelEntry,
  ArticleModelEntrySchema
} from './schemas/article-model-entry.schema.js'
import { GltfFile, GltfFileSchema } from './schemas/gltf-file.schema.js'
import {
  ModelTransformation,
  ModelTransformationSchema
} from './schemas/model-transformation.schema.js'

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
  controllers: [ModelController],
  providers: [ModelService],
  exports: [MongooseModule]
})
export class FileModule {}
