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
import { FileGltf } from '../schemas/file-gltf.schema'

// * Importacion de dtos
import { UpdateFileGltfDto } from '../dtos/update-file-gltf.dto'
import { CreateFileGltfDto } from '../dtos/create-file-gltf.dto'

// * Importacion de servicios
import { GltfValidationService } from './gltf-validation.service'

import { ArticleModelCompositeService } from 'src/modules/article-model/services/article-model-composite.service'

@Injectable()
export class UploadCompositeService {
  constructor(
    @InjectModel(File.name)
    private readonly uploadModel: Model<File>,
    @InjectModel(FileGltf.name)
    private readonly uploadGltfModel: Model<FileGltf>,
    private readonly gltfValidationService: GltfValidationService,

    private readonly articleModelService: ArticleModelCompositeService
  ) {}

  // ! POST - Subir un archivo GLTF

  async uploadFileGltf(
    file: Express.Multer.File,
    article_id: string
  ): Promise<FileGltf> {
    /*
     * Validar el archivo GLTF y subirlo al servidor
     * @param file - Archivo GLTF a subir
     * @param article_id - ID del artículo al que pertenece el archivo
     
      TODO: Verificar la logica de la validacion del archivo GLTF
     */

    await this.gltfValidationService.validateGltfFile(file)

    const article_model =
      await this.articleModelService.getArticleModelByArticleId(article_id)

    const createUploadDto: CreateFileGltfDto = {
      article_model_id: article_model.toJSON()._id,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    }

    return await this.uploadGltfModel.create(createUploadDto)
  }

  // ! GET - Obtener todos los archivos subidos

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

  // ! GET - Obtener un archivo sub

  async getModel(article_id: string): Promise<FileGltf> {
    const articleModel =
      await this.articleModelService.getArticleModelByArticleId(article_id)

    const article_model_id = articleModel.toJSON()._id

    const model = this.uploadGltfModel.findOne({
      article_model_id: article_model_id
    })

    return model
  }

  async update(
    id: string,
    UpdateFileGltfDto: UpdateFileGltfDto
  ): Promise<File> {
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
    existingUpload.filename = UpdateFileGltfDto.filename
    existingUpload.path = UpdateFileGltfDto.path
    existingUpload.mimetype = UpdateFileGltfDto.mimetype
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
