import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoryController } from './controllers/category.controller'
import { CategoryService } from './services/category.service'

import { Category, CategorySchema } from './schemas/category.schema'
import {
  ArticleCategory,
  ArticleCategorySchema
} from './schemas/article-category.schema'
import {
  CategoryData,
  CategoryDataSchema
} from './schemas/category-data.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: ArticleCategory.name, schema: ArticleCategorySchema },
      { name: CategoryData.name, schema: CategoryDataSchema }
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [MongooseModule, CategoryService]
})
export class CategoryModule {}
