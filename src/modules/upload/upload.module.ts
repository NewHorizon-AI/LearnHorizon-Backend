import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose'

import { MulterConfigService } from './services/multer/multer-config.service'

@Module({
  imports: [
    MongooseModule.forFeature([]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService
    })
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule]
})
export class UploadModule {}
