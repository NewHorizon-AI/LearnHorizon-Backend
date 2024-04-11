import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from 'src/dto/category/create-category.dto'
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto'
import { Category } from 'src/schemas/category.schema'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto)
    return createdCategory.save()
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec()
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec()
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec()
  }
}
