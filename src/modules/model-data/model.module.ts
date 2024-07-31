import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Importar Controladores
// import { ModelController } from './controllers/gltf-files.controller'

// Importar Servicios
import { ModelCompositeService } from './services/model-composite.service'

import { ArticleModelEntryService } from './services/gltf-files-services/article-model-entry/article-mode-entry.service'
import { ModelTransformationService } from './services/gltf-files-services/model-transformation/model-transformation.service'

// Importar Schemas
import {
  ArticleModelEntry,
  ArticleModelEntrySchema
} from './schemas/article-model-entry.schema'
import {
  ModelTransformation,
  ModelTransformationSchema
} from './schemas/model-transformation.schema'

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
        name: ModelTransformation.name,
        schema: ModelTransformationSchema
      }
    ])
    // MulterModule
  ],
  controllers: [],
  providers: [
    ModelCompositeService,
    ArticleModelEntryService,
    ModelTransformationService
  ],
  exports: [
    ModelCompositeService,
    ArticleModelEntryService,
    ModelTransformationService
  ]
})
export class FileModule {}
