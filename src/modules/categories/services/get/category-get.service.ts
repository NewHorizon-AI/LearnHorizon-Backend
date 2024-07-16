import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CategoryComplete } from '../../dto/shared//category-complete.interface'

import { Category } from '../../schemas/category.schema'
import { CategoryData } from '../../schemas/category-data.schema'
import { ArticleCategory } from '../../schemas/article-category.schema'

@Injectable()
export class CategoryGetService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(CategoryData.name)
    private readonly categoryDataModel: Model<CategoryData>,
    @InjectModel(ArticleCategory.name)
    private readonly articleCategoryModel: Model<ArticleCategory>
  ) {}

  async findOneComplete(id: string): Promise<CategoryComplete> {
    const category = await this.categoryModel.findById(id).exec()
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }

    const result: CategoryComplete = { category: category.toObject() }

    result.categoryData = await this.categoryDataModel
      .findOne({ category_id: id })
      .exec()
    result.articleCategory = await this.articleCategoryModel
      .find({ category_id: id })
      .exec()

    return result
  }
}
