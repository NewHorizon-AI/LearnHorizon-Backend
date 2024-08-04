// import { Module } from '@nestjs/common'
// import { MongooseModule } from '@nestjs/mongoose'

// // Importar Controladores
// import { ModelDataController } from './controllers/article-model-entry.controllers'

// // Importar Servicios
// import { ArticleModelEntryCompositeService } from './services/article-model-composite.service'
// import { ArticleModelEntryService } from './services/model-data-services/article-model-entry/article-mode-entry.service'
// import { ModelTransformationService } from './services/model-data-services/model-transformation/model-transformation.service'

// // Importar Schemas
// import {
//   ArticleModelEntry,
//   ArticleModelEntrySchema
// } from './schemas/article-model-entry.schema'
// import {
//   ModelTransformation,
//   ModelTransformationSchema
// } from './schemas/model-transformation.schema'

// // Importar Modulos externos
// import { UploadGltfModel } from 'src/modules/upload-gltf/upload-gltf.module'

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       {
//         name: ArticleModelEntry.name,
//         schema: ArticleModelEntrySchema
//       },

//       {
//         name: ModelTransformation.name,
//         schema: ModelTransformationSchema
//       }
//     ]),

//     UploadGltfModel
//   ],
//   controllers: [ModelDataController],
//   providers: [
//     ArticleModelEntryCompositeService,
//     ArticleModelEntryService,
//     ModelTransformationService
//   ],
//   exports: [
//     ArticleModelEntryCompositeService,
//     ArticleModelEntryService,
//     ModelTransformationService
//   ]
// })
// export class ArticleModelEntryModule {}
