import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { unlink } from 'fs/promises'

// * Importacion de schemas
import { File } from '../schemas/file.schema'

// * Importacion de dtos
import { UpdateFileDto } from '../dtos/update-file.dto'
import { CreateFileDto } from '../dtos/create-file.dto'

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(File.name)
    private readonly uploadModel: Model<File>
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    try {
      const createdUpload = new this.uploadModel(createFileDto)
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

  async findAll(): Promise<File[]> {
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

  async findOne(id: string): Promise<File> {
    try {
      const upload = await this.uploadModel.findById(id).exec()
      if (!upload) {
        throw new NotFoundException(`File with ID ${id} not found`)
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

  async update(id: string, updateFileDto: UpdateFileDto): Promise<File> {
    const existingUpload = await this.uploadModel.findById(id).exec()
    if (!existingUpload) {
      throw new NotFoundException(`File with ID ${id} not found`)
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
    existingUpload.filename = updateFileDto.filename
    existingUpload.path = updateFileDto.path
    existingUpload.mimetype = updateFileDto.mimetype
    return existingUpload.save()
  }

  async remove(id: string): Promise<void> {
    const upload = await this.uploadModel.findById(id).exec()
    if (!upload) {
      throw new NotFoundException(`File with ID ${id} not found`)
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
