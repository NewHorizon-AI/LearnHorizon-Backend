import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Importar Controladores
import { ModelController } from './controllers/model.controller'

// Importar Servicios
import { ModelCompositeService } from './services/model-composite.service'

import { ArticleModelEntryService } from './services/gltf-files-services/article-model-entry/article-mode-entry.service'
import { GltfFileService } from './services/gltf-files-services/gltf-file/gltf-file.service'
import { ModelTransformationService } from './services/gltf-files-services/model-transformation/model-transformation.service'

// Importar Schemas
import {
  ArticleModelEntry,
  ArticleModelEntrySchema
} from './schemas/article-model-entry.schema.js'
import { GltfFile, GltfFileSchema } from './schemas/gltf-file.schema.js'
import {
  ModelTransformation,
  ModelTransformationSchema
} from './schemas/model-transformation.schema.js'

// // Importar Moodules
// import { MulterModule } from 'src/modules/multer/multer.module'

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
    // MulterModule
  ],
  controllers: [ModelController],
  providers: [
    ModelCompositeService,
    ArticleModelEntryService,
    GltfFileService,
    ModelTransformationService
  ],
  exports: [
    ModelCompositeService,
    ArticleModelEntryService,
    GltfFileService,
    ModelTransformationService
  ]
})
export class FileModule {}
