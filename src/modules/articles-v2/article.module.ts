import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * Importar Esquemas
import { Article, ArticleSchema } from './schema/article.schema'

// * Importar Controladores
import { ArticleController } from './controllers/article.controllers'

// * Importar Servicios
import { ArticleService } from './services/article.service'

// * Importar Recursos
import { ArticleResourceService } from './resources/article-resource.sevice'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResourceService],
  exports: [MongooseModule, ArticleService, ArticleResourceService]
})
export class ArticleModulev2 {}
