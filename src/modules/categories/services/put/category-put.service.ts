import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UpdateCategoryCompleteDto } from '../../dto/update-category-complete.dto'

import { Category } from '../../schemas/category.schema'
import { CategoryData } from '../../schemas/category-data.schema'
import { ArticleCategory } from '../../schemas/article-category.schema'

@Injectable()
export class CategoryPutService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(CategoryData.name)
    private readonly categoryDataModel: Model<CategoryData>,
    @InjectModel(ArticleCategory.name)
    private readonly articleCategoryModel: Model<ArticleCategory>
  ) {}

  async updateComplete(
    id: string,
    updateCategoryCompleteDto: UpdateCategoryCompleteDto
  ): Promise<void> {
    const { category, categoryData, articleCategory } =
      updateCategoryCompleteDto

    const existingCategory = await this.categoryModel.findById(id)
    if (!existingCategory) {
      throw new NotFoundException('Category not found')
    }
    if (category) {
      Object.assign(existingCategory, category)
      await existingCategory.save()
    }

    if (categoryData) {
      await this.categoryDataModel
        .findOneAndUpdate(
          { category_id: id },
          { ...categoryData, category_id: id },
          { upsert: true }
        )
        .exec()
    }

    if (articleCategory) {
      await this.articleCategoryModel.deleteMany({ category_id: id }).exec()
      await Promise.all(
        articleCategory.map(async (cat) => {
          const newArticleCategory = new this.articleCategoryModel({
            ...cat,
            category_id: id
          })
          await newArticleCategory.save()
        })
      )
    }
  }
}
