import {
  Controller,
  Post,
  UploadedFile,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  HttpCode,
  NotFoundException,
  Res,
  HttpException,
  HttpStatus,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { GltfModelService } from '../../services/gltf-model.service'
import { UpdateGltfModelAssetDto } from '../../dtos/gltf-model-asset/update-gltf-model-asset.dto'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam
} from '@nestjs/swagger'
import { Express } from 'express'

import { createReadStream, existsSync } from 'fs'
import { join } from 'path'
import { Response } from 'express'

@ApiTags('Gltf Model Assets')
@Controller('gltf-model-assets')
export class GltfModelAssetController {
  constructor(private readonly modelService: GltfModelService) {}

  @Post('upload/:articleId')
  @ApiOperation({ summary: 'Subir un modelo GLTF' })
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
  @ApiResponse({ status: 201, description: 'El modelo GLTF ha sido creado.' })
  @ApiResponse({
    status: 400,
    description: 'Tipo de archivo no permitido o datos inválidos.'
  })
  @UseInterceptors(FileInterceptor('file'))
  async createModelFromFile(
    @Param('articleId') articleId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('File not provided')
    }

    return this.modelService.createModelFromFile(articleId, file)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los modelos GLTF' })
  @ApiResponse({ status: 200, description: 'Lista de modelos GLTF.' })
  async getAllModels() {
    return this.modelService.getAllModels()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un modelo GLTF por ID' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 200, description: 'Modelo GLTF encontrado.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.modelService.getModelById(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un modelo GLTF' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 200, description: 'Modelo GLTF actualizado.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateGltfModelAssetDto: UpdateGltfModelAssetDto
  ) {
    return this.modelService.updateModel(id, updateGltfModelAssetDto)
  }

  // Endpoint para devolver un archivo GLTF por ID
  @Get('model/:id')
  @ApiOperation({ summary: 'Obtener archivo GLTF por ID' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 200, description: 'Archivo GLTF devuelto.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const gltfModelAsset = await this.modelService.getModelById(id)

    if (!gltfModelAsset) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }

    const filePath = join(process.cwd(), gltfModelAsset.path)

    if (!existsSync(filePath)) {
      throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND)
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
      'Content-Type': gltfModelAsset.mimetype || 'model/gltf+json', // Mimetype basado en el modelo
      'Content-Disposition': `attachment; filename="${gltfModelAsset.filename || 'model.gltf'}"` // Nombre del archivo GLTF
    })

    fileStream.pipe(res)
  }

  // Endpoint para devolver un archivo GLTF por ID
  @Get('model/article/:id')
  @ApiOperation({ summary: 'Obtener archivo GLTF por ID' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 200, description: 'Archivo GLTF devuelto.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async getFileByArticleId(@Param('id') id: string, @Res() res: Response) {
    const gltfModelAsset = await this.modelService.getModelByArticleId(id)

    if (!gltfModelAsset) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }

    const filePath = join(process.cwd(), gltfModelAsset.path)

    if (!existsSync(filePath)) {
      throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND)
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
      'Content-Type': gltfModelAsset.mimetype || 'model/gltf+json', // Mimetype basado en el modelo
      'Content-Disposition': `attachment; filename="${gltfModelAsset.filename || 'model.gltf'}"` // Nombre del archivo GLTF
    })

    fileStream.pipe(res)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un modelo GLTF' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 204, description: 'Modelo GLTF eliminado.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async remove(@Param('id') id: string) {
    await this.modelService.deleteModel(id)
  }
}
