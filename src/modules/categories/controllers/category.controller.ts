import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ConflictException,
  NotFoundException
} from '@nestjs/common'
import { CreateCategoryDto } from 'src/modules/categories/dto/create-category.dto'
import { UpdateCategoryDto } from 'src/modules/categories/dto/update-category.dto'
import { Category } from 'src/modules/categories/schemas/category.schema'
import { CategoryService } from '../services/category.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({
    status: 201,
    description: 'La categoría ha sido creada exitosamente.',
    type: Category
  })
  @ApiResponse({
    status: 409,
    description: 'La categoría ya existe.'
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    try {
      return await this.categoryService.create(createCategoryDto)
    } catch (error) {
      throw new ConflictException('Category already exists')
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las categorías.',
    type: [Category]
  })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({
    status: 200,
    description: 'La categoría ha sido encontrada.',
    type: Category
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.'
  })
  async findOne(@Param('id') id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id)
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'La categoría ha sido actualizada exitosamente.',
    type: Category
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const category = await this.categoryService.update(id, updateCategoryDto)
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({
    status: 204,
    description: 'La categoría ha sido eliminada exitosamente.'
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.'
  })
  async delete(@Param('id') id: string): Promise<void> {
    const category = await this.categoryService.delete(id)
    if (!category) {
      throw new NotFoundException('Category not found')
    }
  }
}
