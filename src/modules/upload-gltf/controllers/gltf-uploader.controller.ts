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
  Res,
  Put,
  Body
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
import { CreateGltfUploadDto } from '../dtos/upload-gltf-file/file-data'
import { UploadGltf } from '../schema/upload-gltf.schema'

import { Response } from 'express'
import { createReadStream, existsSync } from 'fs'
import { join } from 'path'

import { GltfValidationService } from '../services/gltf-validation.service'
import { UpdateGltfUploadDto } from '../dtos/update-gltf-upload.dto'

@ApiTags('gltf')
@Controller('gltf')
export class GltfUploaderController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly gltfValidationService: GltfValidationService
  ) {}

  // ! POST

  @Post()
  @ApiOperation({ summary: 'Subir un archivo GLTF' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Subida de archivo',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo a subir'
        },
        id: {
          type: 'string',
          description: 'ID asociado al archivo'
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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: string
  ): Promise<UploadGltf> {
    try {
      await this.gltfValidationService.validateGltfFile(file)

      const createUploadDto: CreateGltfUploadDto = {
        article_entry_id: body,
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

  // ! GET

  @Get()
  @ApiOperation({ summary: 'Obtener todos los archivos subidos' })
  @ApiResponse({ status: 200, description: 'Archivos obtenidos exitosamente.' })
  async findAll(): Promise<UploadGltf[]> {
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
  async findOne(@Param('id') id: string): Promise<UploadGltf> {
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

      if (!existsSync(filePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND)
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

  // ! PUT

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un archivo GLTF existente' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        },
        updateGltfUploadDto: {
          type: 'string'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Archivo actualizado exitosamente.'
  })
  @ApiResponse({
    status: 400,
    description:
      'No se proporcionó un archivo o el formato del archivo es inválido.'
  })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('id') id: string,
    @Body() article_entry_id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadGltf> {
    try {
      await this.gltfValidationService.validateGltfFile(file)

      const updateGltfFile: UpdateGltfUploadDto = {
        article_entry_id: article_entry_id,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype
      }

      return await this.uploadService.update(id, updateGltfFile)
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
