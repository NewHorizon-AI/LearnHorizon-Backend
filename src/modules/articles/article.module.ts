import { Module } from '@nestjs/common'
import { ArticleController } from './controllers/article.controller'
import { ArticleService } from './services/article.service'
import { MongooseModule } from '@nestjs/mongoose'

import { Article, ArticleSchema } from './schemas/article.schema'
import {
  ArticleComment,
  ArticleCommentSchema
} from './schemas/articleComment.schema'
import { ArticleData, ArticleDataSchema } from './schemas/articleData.schema'
import {
  ArticleMarkdown,
  ArticleMarkdownSchema
} from './schemas/ArticleMarkdown.schema'
import { ArticleUser, ArticleUserSchema } from './schemas/articleUser.schema'

import { CategoryService } from 'src/modules/categories/services/category.service'
import { CategoryModule } from 'src/modules/categories/category.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ArticleComment.name, schema: ArticleCommentSchema },
      { name: ArticleData.name, schema: ArticleDataSchema },
      { name: ArticleMarkdown.name, schema: ArticleMarkdownSchema },
      { name: ArticleUser.name, schema: ArticleUserSchema }
    ]),
    CategoryModule
  ], // Importar el modelo de la base de datos
  controllers: [ArticleController],
  providers: [ArticleService, CategoryService], // , Object3DService
  exports: [MongooseModule] // Exportar el módulo de Mongoose
})
export class ArticleModule {}
