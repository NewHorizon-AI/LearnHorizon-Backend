import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category } from '../schemas/category.schema'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'

@Injectable()
export class CategoryResourceService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>
  ) {}

  // ? Crear una nueva categoría
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto)
    return createdCategory.save()
  }

  // Obtener todas las categorías
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec()
  }

  // Obtener una categoría por ID
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec()
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return category
  }

  // Actualizar una categoría
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec()

    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    return updatedCategory
  }

  // Eliminar una categoría
  async remove(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return deletedCategory
  }
}
