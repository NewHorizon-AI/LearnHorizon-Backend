import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * (1) Importar Esquemas
import {
  ArticleModel,
  ArticleModelSchema
} from './schemas/article-model.schema'

import {
  ArticleModelTransformation,
  ArticleModelTransformationSchema
} from './schemas/article-model-transformation.schema'

// * (2) Importar Controladores
// import { ArticleModelController } from './controllers/article-model.controller'

// * (3) Importar Servicios
import { ArticleModelCompositeService } from './services/article-model-composite.service'
import { ArticleModelService } from './services/article-model-services/article-model/article-model.service'
import { ArticleModelTransformationService } from './services/article-model-services/article-model-transformation/article-model-transformation.service'
// import { UploadGltfService } from 'src/modules/upload/services/upload-gltf/upload-gltf.service'

// * Importar Modulos
import { UploadModule } from 'src/modules/upload/upload.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ArticleModel.name,
        schema: ArticleModelSchema
      },

      {
        name: ArticleModelTransformation.name,
        schema: ArticleModelTransformationSchema
      }
    ]),
    forwardRef(() => UploadModule)
  ],
  // controllers: [ArticleModelController],
  providers: [
    ArticleModelCompositeService,
    ArticleModelService,
    ArticleModelTransformationService
  ],
  exports: [
    MongooseModule,
    ArticleModelCompositeService,
    ArticleModelService,
    ArticleModelTransformationService
  ]
})
export class ArticleModelModule {}
