import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

import { ModelService } from '../services/model.service.ts'

import { CreateModelCompleteDto } from '../dto/create-model-complete.dto.ts'
import { UpdateModelCompleteDto } from '../dto/update-model-complete.dto.ts'

@ApiTags('models')
@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo modelo completo' })
  @ApiResponse({
    status: 201,
    description: 'El modelo completo ha sido creado con éxito.'
  })
  async create(
    @Body() createModelCompleteDto: CreateModelCompleteDto
  ): Promise<void> {
    await this.modelService.createComplete(createModelCompleteDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un modelo completo existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del modelo',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'El modelo completo ha sido actualizado con éxito.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateModelCompleteDto: UpdateModelCompleteDto
  ): Promise<void> {
    await this.modelService.updateComplete(id, updateModelCompleteDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un modelo completo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del modelo',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'El modelo completo ha sido encontrado.'
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.modelService.findOneComplete(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un modelo completo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del modelo',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'El modelo completo ha sido eliminado con éxito.'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.modelService.remove(id)
  }
}
