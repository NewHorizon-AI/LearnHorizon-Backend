import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'

// * (1) Importar Esquemas
import { ArticleModel } from '../schemas/article-model.schema'
import { ArticleModelTransformation } from '../schemas/article-model-transformation.schema'

// * (2) Importar Dtos
// import { CreateArticleModelDto } from '../dtos/article-model/create-article-model.dto'
// import { CreateArticleModelTransformationDto } from '../dtos/article-model-transformation/create-article-model-transformation.dto'

// * (3) Importar Servicios
import { ArticleModelService } from './article-model-services/article-model/article-model.service'
import { ArticleModelTransformationService } from './article-model-services/article-model-transformation/article-model-transformation.service'
import { Types } from 'mongoose'

@Injectable()
export class ArticleModelCompositeService {
  constructor(
    private readonly articleModelService: ArticleModelService,
    private readonly articleModelTransformationService: ArticleModelTransformationService
  ) {}

  // ! POST - create

  async createArticleModelWithDefaultTransformation(
    article_id: Types.ObjectId
  ): Promise<{
    articleModel: ArticleModel
    articleModelTransformation: ArticleModelTransformation
  }> {
    try {
      // * (1))Crear ArticleModel
      const articleModel =
        await this.articleModelService.createWithDefault(article_id)

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

  // ! GET - find

  async findArticleModelTransformationById(
    article_id: Types.ObjectId
  ): Promise<ArticleModelTransformation> {
    try {
      // * (1) Buscar el ArticleModel usando article_id
      const articleModel =
        await this.articleModelService.findOneArticleModel(article_id)

      // * Usar article_model_id para buscar ModelTransformation
      const articleModelTransformation =
        await this.articleModelTransformationService.findOneByArticleModelId(
          articleModel.toJSON()._id
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
