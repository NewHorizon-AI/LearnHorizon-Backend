// import { Module } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'
// import { MulterModule } from '@nestjs/platform-express'
// import { MongooseModule } from '@nestjs/mongoose'

// // * Importacion de schemas
// import { File, FileSchema } from './schemas/digital-asset.schema'

// // * Importacion de controladores
// import { GltfUploaderController } from './controllers/upload-gltf/upload-gltf.controller'
// import { ModelController } from './controllers/model/model.controller'

// // * Importacion de servicios
// import { MulterConfigService } from './services/multer/multer-config.service'
// import { UploadGltfService } from './services/upload-gltf/upload-gltf.service'

// import { UploadCompositeService } from './services/upload-composite.service'
// import { GltfValidationService } from './services/gltf-validation.service'

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
//     MulterModule.registerAsync({
//       imports: [ConfigModule],
//       useClass: MulterConfigService
//     })
//   ],
//   controllers: [GltfUploaderController, ModelController],
//   providers: [UploadCompositeService, GltfValidationService, UploadGltfService],
//   exports: [MongooseModule, UploadGltfService]
// })
// export class UploadModule {}
