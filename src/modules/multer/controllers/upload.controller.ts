import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Res
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

import { UploadService } from '../services/upload.service'
import { CreateUploadDto } from '../dtos/create-upload.dto'
import { Upload } from '../schema/upload.schema'

import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'

import { GltfValidationService } from '../services/gltf-validation.service'

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly gltfValidationService: GltfValidationService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Subir un archivo GLTF' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Archivo subido exitosamente.' })
  @ApiResponse({
    status: 400,
    description:
      'No se proporcionó un archivo o el formato del archivo es inválido.'
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Upload> {
    try {
      await this.gltfValidationService.validateGltfFile(file)

      const createUploadDto: CreateUploadDto = {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype
      }

      return await this.uploadService.create(createUploadDto)
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

  @Get()
  @ApiOperation({ summary: 'Obtener todos los archivos subidos' })
  @ApiResponse({ status: 200, description: 'Archivos obtenidos exitosamente.' })
  async findAll(): Promise<Upload[]> {
    try {
      return await this.uploadService.findAll()
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al obtener los archivos subidos.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un archivo subido por ID' })
  @ApiResponse({ status: 200, description: 'Archivo obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado.' })
  async findOne(@Param('id') id: string): Promise<Upload> {
    try {
      return await this.uploadService.findOne(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al obtener el archivo subido.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('file/:id')
  @ApiOperation({ summary: 'Descargar un archivo subido por ID' })
  @ApiResponse({ status: 200, description: 'Archivo descargado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado.' })
  async getFile(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const upload = await this.uploadService.findOne(id)
      const filePath = join(process.cwd(), upload.path)
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
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al descargar el archivo.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un archivo subido por ID' })
  @ApiResponse({ status: 200, description: 'Archivo eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.uploadService.remove(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al eliminar el archivo subido.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
