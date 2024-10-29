import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// * Importar Esquemas
import { Article, ArticleSchema } from './schema/article.schema'

// * Importar Controladores
import { ArticleController } from './controllers/article.controllers'

// * Importar Servicios
import { ArticleService } from './services/article.service'

// * Importar Recursos
import { ArticleResourceService } from './resources/article-resource.sevice'

// * Importar Modulos
import { SceneModule } from '../scene/scene.module'
import { DigitalAssetModule } from '../digital-asset/digital-asset.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    forwardRef(() => SceneModule),
    forwardRef(() => DigitalAssetModule)
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResourceService],
  exports: [MongooseModule, ArticleService, ArticleResourceService]
})
export class ArticleModulev2 {}
