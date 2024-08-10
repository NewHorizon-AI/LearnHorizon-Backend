import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose'

// * Importacion de schemas
import { File, FileSchema } from './schemas/file.schema'

// * Importacion de controladores
import { GltfUploaderController } from './controllers/upload-gltf/upload-gltf.controllers'

// * Importacion de servicios
import { MulterConfigService } from './services/multer/multer-config.service'

import { UploadService } from './services/upload.service'
import { GltfValidationService } from './services/gltf-validation.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService
    })
  ],
  controllers: [GltfUploaderController],
  providers: [UploadService, GltfValidationService],
  exports: [MongooseModule]
})
export class UploadModule {}
