import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * (1) Importar Esquemas
import {
  ArticleModel,
  ArticleModelSchema
} from './schemas/article-model.schema'

import {
  ModelTransformation,
  ModelTransformationSchema
} from './schemas/article-model-transformation.schema'

// * (2) Importar Controladores
import { ArticleModelController } from './controllers/article-model.controller'

// * (3) Importar Servicios
import { ArticleModelCompositeService } from './services/article-model-composite.service'
import { ArticleModelService } from './services/article-model-services/article-model/article-mode-.service'
import { ModelTransformationService } from './services/article-model-services/article-model-transformation/article-model-transformation.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ArticleModel.name,
        schema: ArticleModelSchema
      },

      {
        name: ModelTransformation.name,
        schema: ModelTransformationSchema
      }
    ])
  ],
  controllers: [ArticleModelController],
  providers: [
    ArticleModelCompositeService,
    ArticleModelService,
    ModelTransformationService
  ],
  exports: [
    MongooseModule,
    ArticleModelCompositeService,
    ArticleModelService,
    ModelTransformationService
  ]
})
export class ArticleModelModule {}
