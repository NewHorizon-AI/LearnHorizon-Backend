import { Injectable } from '@nestjs/common'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Injectable()
export class MulterService {
  getMulterOptions() {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
        }
      }),
      limits: {
        fileSize: 1024 * 1024 * 5 // 5MB de límite
      },
      fileFilter: (req, file, callback) => {
        const allowedTypes = /gltf/
        const extnameTest = allowedTypes.test(
          extname(file.originalname).toLowerCase()
        )
        const mimetype = allowedTypes.test(file.mimetype)
        if (mimetype && extnameTest) {
          return callback(null, true)
        } else {
          callback(new Error('Only .gltf files are allowed'), false)
        }
      }
    }
  }
}
