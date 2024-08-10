import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  MulterOptionsFactory,
  MulterModuleOptions
} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}
  /*
   * El método createMulterOptions() se encarga de crear las opciones de Multer para la carga de archivos.
   TODO: Configura Multer en NestJS para rutas de archivos dinámicas. como images o models.
   */

  createMulterOptions(): MulterModuleOptions {
    // * Obtener la ruta de carga de archivos del archivo .env
    const uploadPath = this.configService.get('UPLOAD_PATH')

    return {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`
          callback(null, filename)
        }
      })
    }
  }
}
