import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryController } from './controllers/category.controller'
import { CategoryService } from './services/category.service'
import { CategoryGetService } from './services/get/category-get.service'
import { CategoryPostService } from './services/post/category-post.service'
import { CategoryPutService } from './services/put/category-put.service'
import { CategoryDeleteService } from './services/delete/category-delete.service'

import { Category, CategorySchema } from './schemas/category.schema'
import {
  CategoryData,
  CategoryDataSchema
} from './schemas/category-data.schema'
import {
  ArticleCategory,
  ArticleCategorySchema
} from './schemas/article-category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: CategoryData.name, schema: CategoryDataSchema },
      { name: ArticleCategory.name, schema: ArticleCategorySchema }
    ])
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryGetService,
    CategoryPostService,
    CategoryPutService,
    CategoryDeleteService
  ],
  exports: [
    CategoryService,
    CategoryGetService,
    CategoryPostService,
    CategoryPutService,
    CategoryDeleteService
  ]
})
export class CategoryModule {}
