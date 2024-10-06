import { Injectable } from '@nestjs/common'

import { CategoryResourceService } from '../resources/category-resource.service'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { Category } from '../schemas/category.schema'

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryResourceService: CategoryResourceService
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryResourceService.create(createCategoryDto)
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryResourceService.findAll()
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryResourceService.findOne(id)
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryResourceService.update(id, updateCategoryDto)
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.categoryResourceService.remove(id)
  }
}
