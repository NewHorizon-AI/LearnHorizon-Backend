import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateCategoryCompleteDto } from '../../dto/create-category-complete.dto'
import { Category } from '../../schemas/category.schema'
import { CategoryData } from '../../schemas/category-data.schema'
import { ArticleCategory } from '../../schemas/article-category.schema'

@Injectable()
export class CategoryPostService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(CategoryData.name)
    private readonly categoryDataModel: Model<CategoryData>,
    @InjectModel(ArticleCategory.name)
    private readonly articleCategoryModel: Model<ArticleCategory>
  ) {}

  async createComplete(
    createCategoryCompleteDto: CreateCategoryCompleteDto
  ): Promise<void> {
    const { category, categoryData, articleCategory } =
      createCategoryCompleteDto

    const createdCategory = new this.categoryModel(category)
    await createdCategory.save()

    if (categoryData) {
      const newCategoryData = new this.categoryDataModel({
        ...categoryData,
        category_id: createdCategory._id
      })
      await newCategoryData.save()
    }

    if (articleCategory) {
      await Promise.all(
        articleCategory.map(async (cat) => {
          const newArticleCategory = new this.articleCategoryModel({
            ...cat,
            category_id: createdCategory._id
          })
          await newArticleCategory.save()
        })
      )
    }
  }
}
