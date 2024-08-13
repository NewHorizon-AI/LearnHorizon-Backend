import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose'

// * Importacion de modulos
import { ArticleModelModule } from 'src/modules/article-model/article-model.module'

// * Importacion de schemas
import { File, FileSchema } from './schemas/file.schema'
import { FileGltf, FileGltfSchema } from './schemas/file-gltf.schema'

// * Importacion de controladores
import { GltfUploaderController } from './controllers/upload-gltf/upload-gltf.controller'
import { ModelController } from './controllers/model/model.controller'

// * Importacion de servicios
import { MulterConfigService } from './services/multer/multer-config.service'
import { UploadGltfService } from './services/upload-gltf/upload-gltf.service'
import { ArticleModelCompositeService } from 'src/modules/article-model/services/article-model-composite.service'
import { UploadCompositeService } from './services/upload-composite.service'
import { GltfValidationService } from './services/gltf-validation.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: FileGltf.name, schema: FileGltfSchema }
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService
    }),
    ArticleModelModule
  ],
  controllers: [GltfUploaderController, ModelController],
  providers: [
    UploadCompositeService,
    GltfValidationService,
    UploadGltfService,
    ArticleModelCompositeService
  ],
  exports: [MongooseModule]
})
export class UploadModule {}
