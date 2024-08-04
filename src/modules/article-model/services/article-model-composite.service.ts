import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'

// * (1) Importar Esquemas
import { ArticleModel } from '../schemas/article-model.schema'
import { ArticleModelTransformation } from '../schemas/article-model-transformation.schema'
import { Article } from 'src/modules/articles/schemas/article.schema'

// * (2) Importar Dtos
// import { CreateArticleModelDto } from '../dtos/article-model/create-article-model.dto'
// import { CreateArticleModelTransformationDto } from '../dtos/article-model-transformation/create-article-model-transformation.dto'

// * (3) Importar Servicios
import { ArticleModelService } from './article-model-services/article-model/article-model.service'
import { ArticleModelTransformationService } from './article-model-services/article-model-transformation/article-model-transformation.service'

@Injectable()
export class ArticleModelCompositeService {
  constructor(
    private readonly articleModelService: ArticleModelService,
    private readonly articleModelTransformationService: ArticleModelTransformationService
  ) {}

  async createArticleModelWithDefaultTransformation(article: Article): Promise<{
    articleModel: ArticleModel
    articleModelTransformation: ArticleModelTransformation
  }> {
    try {
      // * (1))Crear ArticleModel
      const articleModel =
        await this.articleModelService.createWithDefault(article)

      // * (3) Crear ModelTransformation usando el ID del ArticleModel recién creado
      const articleModelTransformation =
        await this.articleModelTransformationService.createWithDefault(
          articleModel
        )

      return { articleModel, articleModelTransformation }
    } catch (error) {
      // * (2) Manejar errores
      throw new BadRequestException(error.message)
    }
  }

  async findArticleModelTransformationById(
    article_id: string
  ): Promise<ArticleModelTransformation> {
    try {
      // Buscar ArticleModel usando article_id
      const articleModel = await this.articleModelService.findOne(article_id)
      if (!articleModel) {
        throw new NotFoundException(
          `ArticleModel with ID ${article_id} not found`
        )
      }

      // Usar article_model_id para buscar ModelTransformation
      const articleModelTransformation =
        await this.articleModelTransformationService.findOneByArticleModelId(
          articleModel._id.toString()
        )
      if (!articleModelTransformation) {
        throw new NotFoundException(
          `ModelTransformation with article_model_id ${articleModel._id} not found`
        )
      }

      return articleModelTransformation
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
