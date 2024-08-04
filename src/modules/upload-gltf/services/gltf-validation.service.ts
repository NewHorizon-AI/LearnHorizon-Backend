import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { promises as fs } from 'fs'
import { unlink } from 'fs/promises'

@Injectable()
export class GltfValidationService {
  async validateGltfFile(file: Express.Multer.File): Promise<void> {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST)
    }

    try {
      const fileContent = await fs.readFile(file.path, 'utf8')
      const jsonContent = JSON.parse(fileContent)

      // Validar que el archivo tenga las propiedades básicas de un archivo GLTF
      if (!jsonContent.asset || !jsonContent.scenes || !jsonContent.nodes) {
        await this.deleteFile(file.path)
        throw new HttpException(
          'Invalid GLTF file format',
          HttpStatus.BAD_REQUEST
        )
      }

      // Validación adicional específica para GLTF
      if (!jsonContent.asset.version || jsonContent.asset.version !== '2.0') {
        await this.deleteFile(file.path)
        throw new HttpException(
          'Invalid GLTF file version',
          HttpStatus.BAD_REQUEST
        )
      }
    } catch (error) {
      await this.deleteFile(file.path)
      throw new HttpException(
        'Invalid GLTF file format',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  private async deleteFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath)
    } catch (error) {
      if (error.code !== 'ENOENT') {
        // Ignorar el error si el archivo no existe
        throw new HttpException(
          'Error al eliminar el archivo no válido',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }
  }
}
