import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Importaciones necesarias para multer
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

import { UploadGltf, UploadGltfSchema } from './schema/upload-gltf.schema'
import { UploadService } from './services/upload.service'

import { GltfUploaderController } from './controllers/gltf-uploader.controller'

import { GltfValidationService } from './services/gltf-validation.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UploadGltf.name, schema: UploadGltfSchema }
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`
          callback(null, filename)
        }
      })
    })
  ],
  controllers: [GltfUploaderController],
  providers: [UploadService, GltfValidationService],
  exports: [UploadService, GltfValidationService]
})
export class UploadGltfModel {}
