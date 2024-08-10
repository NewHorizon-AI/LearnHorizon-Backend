import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateGltfUploadDto } from '../../dtos/create-upload.dto'
import { UploadGltf } from '../../schema/upload-gltf.schema'

import { unlink } from 'fs/promises'

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(UploadGltf.name)
    private readonly uploadModel: Model<UploadGltf>
  ) {}

  async create(createUploadDto: CreateGltfUploadDto): Promise<UploadGltf> {
    try {
      const createdUpload = new this.uploadModel(createUploadDto)
      return createdUpload.save()
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al crear la subida del archivo'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
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
          message: 'Error al obtener las subidas de archivos'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async findOne(id: string): Promise<UploadGltf> {
    try {
      const upload = await this.uploadModel.findById(id).exec()
      if (!upload) {
        throw new NotFoundException(`UploadGltf with ID ${id} not found`)
      }
      return upload
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al obtener la subida del archivo'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async update(
    id: string,
    createUploadDto: CreateGltfUploadDto
  ): Promise<UploadGltf> {
    const existingUpload = await this.uploadModel.findById(id).exec()
    if (!existingUpload) {
      throw new NotFoundException(`UploadGltf with ID ${id} not found`)
    }

    try {
      // Eliminar el archivo anterior
      await unlink(existingUpload.path)
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new HttpException(
          'Error al eliminar el archivo anterior',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }

    // Actualizar la información del archivo en la base de datos
    existingUpload.filename = createUploadDto.filename
    existingUpload.path = createUploadDto.path
    existingUpload.mimetype = createUploadDto.mimetype
    return existingUpload.save()
  }

  async remove(id: string): Promise<void> {
    const upload = await this.uploadModel.findById(id).exec()
    if (!upload) {
      throw new NotFoundException(`UploadGltf with ID ${id} not found`)
    }
    try {
      await unlink(upload.path)
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
