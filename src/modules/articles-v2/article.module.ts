import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * Importar Esquemas
import { Article, ArticleSchema } from './schema/article.schema'

// * Importar Controladores
import { ArticleController } from './controllers/article.controllers'

// * Importar Servicios
import { ArticleService } from './services/article.service'

// * Importar Recursos
import { ArticleResource } from './resources/article.resource'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResource],
  exports: [ArticleService, MongooseModule]
})
export class ArticleModulev2 {}
