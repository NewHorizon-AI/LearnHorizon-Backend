import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete
} from '@nestjs/common'
import { CategoryService } from '../services/category.service'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('categories')
@Controller('categories/v2')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto)
  }

  @Get()
  async findAll() {
    return this.categoryService.getCategories()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id)
  }
}
