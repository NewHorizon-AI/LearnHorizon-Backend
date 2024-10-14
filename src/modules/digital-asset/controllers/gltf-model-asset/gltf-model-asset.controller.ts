import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  HttpCode,
  NotFoundException,
  Res
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { GltfModelAssetResourceService } from '../../resources/gltf-model-asset-resource.service'
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
import path from 'path'
import { Response } from 'express'

import * as fsSync from 'fs'

@ApiTags('Gltf Model Assets')
@Controller('gltf-model-assets')
export class GltfModelAssetController {
  constructor(
    private readonly gltfModelAssetService: GltfModelAssetResourceService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir un archivo GLTF' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo GLTF a subir',
    type: 'multipart/form-data',
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.gltfModelAssetService.createFromFile(file)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los modelos GLTF' })
  @ApiResponse({ status: 200, description: 'Lista de modelos GLTF.' })
  async findAll() {
    return this.gltfModelAssetService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un modelo GLTF por ID' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 200, description: 'Modelo GLTF encontrado.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.gltfModelAssetService.findOne(id)
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
    return this.gltfModelAssetService.update(id, updateGltfModelAssetDto)
  }

  // Endpoint para devolver un archivo GLTF por ID
  @Get(':id/file')
  @ApiOperation({ summary: 'Obtener archivo GLTF por ID' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 200, description: 'Archivo GLTF devuelto.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const gltfModelAsset = await this.gltfModelAssetService.findOne(id)

    if (!gltfModelAsset) {
      throw new NotFoundException(`Modelo GLTF con id ${id} no encontrado`)
    }

    // Define the file path
    const filePath = path.join(__dirname, 'path_to_gltf_files', `${id}.gltf`)

    // Verifica si el archivo existe en la ruta especificada
    if (!fsSync.existsSync(filePath)) {
      throw new NotFoundException(
        `Archivo GLTF no encontrado en la ruta ${filePath}`
      )
    }

    // Devuelve el archivo como respuesta
    res.sendFile(filePath)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un modelo GLTF' })
  @ApiParam({ name: 'id', description: 'ID del modelo GLTF' })
  @ApiResponse({ status: 204, description: 'Modelo GLTF eliminado.' })
  @ApiResponse({ status: 404, description: 'Modelo GLTF no encontrado.' })
  async remove(@Param('id') id: string) {
    await this.gltfModelAssetService.remove(id)
  }
}
