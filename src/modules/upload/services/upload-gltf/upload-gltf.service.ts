import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ClientSession, Model, Types } from 'mongoose'
import { unlink } from 'fs/promises'

// * Importacion de schemas
import { FileGltf } from '../../schemas/file-gltf.schema'

// * Importacion de dtos
import { UpdateFileGltfDto } from '../../dtos/update-file-gltf.dto'
import { CreateFileGltfDto } from '../../dtos/create-file-gltf.dto'

@Injectable()
export class UploadGltfService {
  constructor(
    @InjectModel(FileGltf.name)
    private readonly fileGltf: Model<FileGltf>
  ) {}

  // ! POST

  async createFileGltf(createFileGtf: CreateFileGltfDto): Promise<FileGltf> {
    /*
     * Crear un nuevo documento en la colección de archivos GLTF
     * @param createFileGtf - DTO con la información del archivo GLTF
     */
    try {
      return await this.fileGltf.create(createFileGtf)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(): Promise<FileGltf[]> {
    try {
      return this.fileGltf.find().exec()
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

  async findOne(id: string): Promise<FileGltf> {
    try {
      const upload = await this.fileGltf.findById(id).exec()
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

  async update(
    id: string,
    UpdateFileGltfDto: UpdateFileGltfDto
  ): Promise<FileGltf> {
    const existingUpload = await this.fileGltf.findById(id).exec()
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
    existingUpload.filename = UpdateFileGltfDto.filename
    existingUpload.path = UpdateFileGltfDto.path
    existingUpload.mimetype = UpdateFileGltfDto.mimetype
    return existingUpload.save()
  }

  // async remove(id: string): Promise<void> {
  //   const upload = await this.fileGltf.findById(id).exec()
  //   if (!upload) {
  //     throw new NotFoundException(`File with ID ${id} not found`)
  //   }
  //   try {
  //     await unlink(upload.path)
  //   } catch (error) {
  //     if (error.code !== 'ENOENT') {
  //       throw new HttpException(
  //         'Error al eliminar el archivo',
  //         HttpStatus.INTERNAL_SERVER_ERROR
  //       )
  //     }
  //   }
  //   await upload.deleteOne()
  // }

  async deleteAssociatedFiles(
    articleModelId: Types.ObjectId,
    session?: ClientSession
  ): Promise<void> {
    // Buscar todos los uploads relacionados con el articleModelId
    const uploads = await this.fileGltf
      .find({ articleModelId })
      .session(session)
      .exec()

    if (!uploads.length) return // Si no hay archivos, salir de la función

    await Promise.all(
      uploads.map(async (upload) => {
        try {
          await unlink(upload.path) // Elimina el archivo del sistema de archivos
        } catch (error) {
          if (error.code !== 'ENOENT') {
            // Si ocurre un error distinto a 'archivo no encontrado', lanza una excepción
            throw new HttpException(
              'Error al eliminar el archivo',
              HttpStatus.INTERNAL_SERVER_ERROR
            )
          }
        }
        // Elimina el registro del archivo en la base de datos
        await this.fileGltf
          .deleteOne({ _id: upload._id })
          .session(session)
          .exec()
      })
    )
  }
}
