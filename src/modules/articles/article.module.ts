import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * (1) Importar Esquemas
import { Article, ArticleSchema } from './schemas/article.schema'
import { ArticleData, ArticleDataSchema } from './schemas/article-data.schema'
import {
  ArticleMarkdown,
  ArticleMarkdownSchema
} from './schemas/article-markdown.schema'

// * (2) Importar Controladores

import { ArticleController } from './controllers/article.controller'

// * (3) Importar Servicios
import { ArticleCompositeService } from './services/article-composite.service'
import { ArticleAggregatorService } from './services/aggregators/article-aggregator.service'
import { ArticleBaseService } from './services/article-services/article-base/article-base.service'
import { ArticleDataService } from './services/article-services/article-data/article-data.service'
import { ArticleMarkdownService } from './services/article-services/article-markdown/article-markdown.service'

// * (4) Importar Módulos
import { CategoryModule } from '../categories/category.module'
import { UserModule } from 'src/modules/users/user.module'
import { ArticleModelModule } from 'src/modules/article-model/article-model.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ArticleData.name, schema: ArticleDataSchema },
      { name: ArticleMarkdown.name, schema: ArticleMarkdownSchema }
    ]),
    CategoryModule,
    UserModule,
    ArticleModelModule
  ],
  controllers: [ArticleController],
  providers: [
    ArticleCompositeService,
    ArticleBaseService,
    ArticleDataService,
    ArticleMarkdownService,
    ArticleAggregatorService
  ],
  exports: [
    ArticleCompositeService,
    ArticleBaseService,
    ArticleDataService,
    ArticleMarkdownService,
    ArticleAggregatorService,
    MongooseModule
  ]
})
export class ArticleModule {}
