import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateUploadDto } from '../dtos/create-upload.dto'
import { Upload, UploadDocument } from '../schema/upload.schema'

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<UploadDocument>
  ) {}

  async create(createUploadDto: CreateUploadDto): Promise<Upload> {
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

  async findAll(): Promise<Upload[]> {
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

  async findOne(id: string): Promise<Upload> {
    try {
      const upload = await this.uploadModel.findById(id).exec()
      if (!upload) {
        throw new NotFoundException(`Upload with ID ${id} not found`)
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

  async remove(id: string): Promise<void> {
    try {
      const result = await this.uploadModel.deleteOne({ _id: id }).exec()
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Upload with ID ${id} not found`)
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al eliminar la subida del archivo'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
