import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ModelController } from './controllers/model.controller.ts.js'
import { ModelService } from './services/model.service.ts.js'

import { ModelGetService } from './services/get/model-get.service'
import { ModelPostService } from './services/post/model-post.service'
import { ModelPutService } from './services/put/model-put.service'
import { ModelDeleteService } from './services/delete/model-delete.service'

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
  ],
  controllers: [ModelController],
  providers: [
    ModelService,
    ModelGetService,
    ModelPostService,
    ModelPutService,
    ModelDeleteService
  ],
  exports: [
    ModelService,
    ModelGetService,
    ModelPostService,
    ModelPutService,
    ModelDeleteService
  ]
})
export class FileModule {}
