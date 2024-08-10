import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateGltfUploadDto } from '../../dtos/create-upload.dto'
import { UpdateGltfUploadDto } from '../../dtos/update-gltf-upload.dto'

import { UploadGltf } from '../../schema/upload-gltf.schema'
import { GltfValidationService } from '../upload-gltf-file/gltf-validation.service'

import { unlink, createReadStream, existsSync } from 'fs'
import { join } from 'path'
import { Response } from 'express'

@Injectable()
export class UploadCompositeService {
  constructor(
    @InjectModel(UploadGltf.name)
    private readonly uploadModel: Model<UploadGltf>,
    private readonly gltfValidationService: GltfValidationService
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadGltf> {
    try {
      await this.gltfValidationService.validateGltfFile(file)
      const createUploadDto: CreateGltfUploadDto = {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype
      }
      const createdUpload = new this.uploadModel(createUploadDto)
      return createdUpload.save()
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al subir el archivo.'
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async updateFile(
    id: string,

    file: Express.Multer.File
  ): Promise<UploadGltf> {
    try {
      await this.gltfValidationService.validateGltfFile(file)
      const createUploadDto: UpdateGltfUploadDto = {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype
      }
      const existingUpload = await this.uploadModel.findById(id).exec()
      if (!existingUpload) {
        throw new NotFoundException(` UploadGltf with ID ${id} not found`)
      }
      unlink(existingUpload.path, () => {})
      existingUpload.filename = createUploadDto.filename
      existingUpload.path = createUploadDto.path
      existingUpload.mimetype = createUploadDto.mimetype
      return existingUpload.save()
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al actualizar el archivo.'
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async findAll(): Promise<UploadGltf[]> {
    try {
      return this.uploadModel.find().exec()
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al obtener las subidas de archivos.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async findOne(id: string): Promise<UploadGltf> {
    try {
      const upload = await this.uploadModel.findById(id).exec()
      if (!upload) {
        throw new NotFoundException(` UploadGltf with ID ${id} not found`)
      }
      return upload
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al obtener la subida del archivo.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getFile(id: string, res: Response): Promise<void> {
    try {
      const upload = await this.uploadModel.findById(id).exec()
      const filePath = join(process.cwd(), upload.path)
      if (!existsSync(filePath)) {
        throw new NotFoundException('File not found')
      }
      const fileStream = createReadStream(filePath)
      fileStream.on('error', () => {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error al leer el archivo.'
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      })
      res.set({
        'Content-Type': upload.mimetype,
        'Content-Disposition': `attachment; filename="${upload.filename}"`
      })
      fileStream.pipe(res)
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al descargar el archivo.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async remove(id: string): Promise<void> {
    const upload = await this.uploadModel.findById(id).exec()
    if (!upload) {
      throw new NotFoundException(` UploadGltf with ID ${id} not found`)
    }
    try {
      unlink(upload.path, () => {})
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new HttpException(
          'Error al eliminar el archivo',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }
    await upload.deleteOne()
  }
}
