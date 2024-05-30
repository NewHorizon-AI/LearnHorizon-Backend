// file-upload.module.ts
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { MongooseModule } from '@nestjs/mongoose'
import { File, FileSchema } from './schemas/file.schema'
import { FileUploadService } from './services/file-upload.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('UPLOAD_DIRECTORY'),
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9)
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`)
          }
        })
      }),
      inject: [ConfigService]
    })
  ],

  providers: [FileUploadService],
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class FileUploadModule {}
