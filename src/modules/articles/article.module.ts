import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleController } from './controllers/article.controller'
import { ArticleService } from './services/article.service'
import { ArticleGetService } from './services/get/article-get.service'
import { ArticlePostService } from './services/post/article-post.service'
import { ArticlePutService } from './services/put/article-put.service'
import { ArticleDeleteService } from './services/delete/article-delete.service'

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
import { ArticleUser, ArticleUserSchema } from './schemas/article-user.schema'
import { ArticleTag, ArticleTagSchema } from './schemas/article-tag.schema'

import { CategoryModule } from '../categories/category.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ArticleComment.name, schema: ArticleCommentSchema },
      { name: ArticleData.name, schema: ArticleDataSchema },
      { name: ArticleMarkdown.name, schema: ArticleMarkdownSchema },
      { name: ArticleUser.name, schema: ArticleUserSchema },
      { name: ArticleTag.name, schema: ArticleTagSchema }
    ]),
    CategoryModule
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleGetService,
    ArticlePostService,
    ArticlePutService,
    ArticleDeleteService
  ],
  exports: [
    ArticleService,
    ArticleGetService,
    ArticlePostService,
    ArticlePutService,
    ArticleDeleteService
  ]
})
export class ArticleModule {}
