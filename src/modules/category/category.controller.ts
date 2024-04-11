import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { CreateCategoryDto } from 'src/dto/category/create-category.dto'
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto'
import { Category } from 'src/schemas/category.schema'
import { CategoryService } from './category.service'
import { ConflictException, NotFoundException } from '@nestjs/common'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id)
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category
  }

  @Put(':id')
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
  async delete(@Param('id') id: string): Promise<void> {
    const category = await this.categoryService.delete(id)
    if (!category) {
      throw new NotFoundException('Category not found')
    }
  }
}
