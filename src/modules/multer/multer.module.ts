import { Module } from '@nestjs/common'
import { MulterModule as NestMulterModule } from '@nestjs/platform-express'
import { MulterService } from './services/multer.service'

@Module({
  imports: [
    NestMulterModule.register({
      dest: './uploads' // Directorio donde se guardarán los archivos
    })
  ],
  providers: [MulterService],
  exports: [MulterService]
})
export class MulterModule {}
