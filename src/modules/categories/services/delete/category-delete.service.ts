import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Category } from '../../schemas/category.schema'
import { CategoryData } from '../../schemas/category-data.schema'
import { ArticleCategory } from '../../schemas/article-category.schema'

@Injectable()
export class CategoryDeleteService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(CategoryData.name)
    private readonly categoryDataModel: Model<CategoryData>,
    @InjectModel(ArticleCategory.name)
    private readonly articleCategoryModel: Model<ArticleCategory>
  ) {}

  async remove(id: string): Promise<void> {
    const category = await this.categoryModel.findById(id).exec()
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }

    await this.categoryModel.findByIdAndDelete(id).exec()
    await this.categoryDataModel.deleteOne({ category_id: id }).exec()
    await this.articleCategoryModel.deleteMany({ category_id: id }).exec()
  }
}
