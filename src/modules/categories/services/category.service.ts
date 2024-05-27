import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from 'src/modules/categories/dto/create-category.dto'
import { UpdateCategoryDto } from 'src/modules/categories/dto/update-category.dto'
import { Category } from 'src/modules/categories/schemas/category.schema'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  // Metodo para crear una categoría
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

  // Metodo para incrementar el contador de publicaciones de una categoría
  async incrementPublicationCount(ids: string[]): Promise<void> {
    try {
      await Promise.all(
        ids.map((id) =>
          this.categoryModel.findByIdAndUpdate(
            id,
            {
              $inc: { publicationCount: 1 }
            },
            { new: true }
          )
        )
      )
    } catch (error) {
      throw new Error('Error incrementing publication count')
    }
  }

  // Metodo para decrementar el contador de publicaciones de una categoría
  async decrementPublicationCount(ids: string[]): Promise<void> {
    try {
      await Promise.all(
        ids.map((id) =>
          this.categoryModel
            .findByIdAndUpdate(
              id,
              {
                $inc: { publicationCount: -1 }
              },
              { new: true }
            )
            .exec()
        )
      )
    } catch (error) {
      throw new Error('Error decrementing publication count')
    }
  }
}
