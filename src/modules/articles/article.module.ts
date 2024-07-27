// Importaciones de librerías necesarias
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Importaciones de controladores
import { ArticleController } from './controllers/article.controller'

// Importaciones de servicios
import { ArticleService } from './services/article.service'
import { ArticleBaseService } from './services/article-base/article-base.service'

// Importaciones de esquemas
import { Article, ArticleSchema } from './schemas/article.schema'
import {
  ArticleComment,
  ArticleCommentSchema
} from './schemas/article-comment.schema'
import { ArticleData, ArticleDataSchema } from './schemas/article-data.schema'
import {
  ArticleMarkdown,
  ArticleMarkdownSchema
} from './schemas/article-markdown.schema'
import { ArticleTag, ArticleTagSchema } from './schemas/article-tag.schema'

// Importaciones de módulos
import { CategoryModule } from '../categories/category.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ArticleComment.name, schema: ArticleCommentSchema },
      { name: ArticleData.name, schema: ArticleDataSchema },
      { name: ArticleMarkdown.name, schema: ArticleMarkdownSchema },
      { name: ArticleTag.name, schema: ArticleTagSchema }
    ]),
    CategoryModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleBaseService],
  exports: [ArticleService, ArticleBaseService]
})
export class ArticleModule {}
