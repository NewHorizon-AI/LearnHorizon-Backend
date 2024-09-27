import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common'
import { CategoryService } from '../services/category.service'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

import { CreateCategoryCompleteDto } from '../dto/create-category-complete.dto'
import { UpdateCategoryCompleteDto } from '../dto/update-category-complete.dto'
import { Category } from '../schemas/category.schema'

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría completa' })
  @ApiResponse({
    status: 201,
    description: 'La categoría completa ha sido creada con éxito.'
  })
  async create(
    @Body() createCategoryCompleteDto: CreateCategoryCompleteDto
  ): Promise<void> {
    await this.categoryService.createComplete(createCategoryCompleteDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría completa existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'La categoría completa ha sido actualizada con éxito.',
    type: Category
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryCompleteDto: UpdateCategoryCompleteDto
  ): Promise<void> {
    await this.categoryService.updateComplete(id, updateCategoryCompleteDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría completa por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'La categoría completa ha sido encontrada.',
    type: Category
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.categoryService.findOneComplete(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría completa por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: '60d2f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'La categoría completa ha sido eliminada con éxito.'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(id)
  }
}
