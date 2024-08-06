import { Injectable, NotFoundException } from '@nestjs/common'
import { Types } from 'mongoose'

// * (1) Importar Esquemas
import { ArticleModel } from '../schemas/article-model.schema'
import { ArticleModelTransformation } from '../schemas/article-model-transformation.schema'

// * (2) Importar Dtos
import { CreateArticleModelDto } from '../dtos/article-model/create-article-model.dto'
import { CreateArticleModelTransformationDto } from '../dtos/article-model-transformation/create-article-model-transformation.dto'

// * (3) Importar Servicios
import { ArticleModelService } from './article-model-services/article-model/article-model.service'
import { ArticleModelTransformationService } from './article-model-services/article-model-transformation/article-model-transformation.service'

@Injectable()
export class ArticleModelCompositeService {
  constructor(
    private readonly articleModelService: ArticleModelService,
    private readonly articleModelTransformationService: ArticleModelTransformationService
  ) {}

  // ! POST - create

  async createArticleModel(article_id: Types.ObjectId): Promise<ArticleModel> {
    /*
     * Crea un nuevo ArticleModel con el article_id proporcionado, para ser utilizado en la creación de un nuevo articleModel
     @ Param article_id ID del artículo al que se asociará el ArticleModel
     */

    // * (1) Verifica que el article_id no sea nulo y crea la instancia de CreateArticleModelDto
    const articleModel: CreateArticleModelDto = {
      article_id: article_id
    }

    // * (2) Crea un nuevo ArticleModel
    return await this.articleModelService.create(articleModel)
  }

  async createArticleModelTransformation(
    articl_model_id: Types.ObjectId
  ): Promise<ArticleModelTransformation> {
    /*
     * Crea un nuevo ModelTransformation con el article_model_id proporcionado, para ser utilizado en la creación de un nuevo articleModelTransformation
     @ Param articleModel_id ID del ArticleModel al que se asociará el ModelTransformation
     */

    // * (1) Verifica que el articleModel_id no sea nulo y crea la instancia de CreateArticleModelTransformationDto
    const articleModelTransformation: CreateArticleModelTransformationDto = {
      article_model_id: articl_model_id
    }

    // * (2) Crea un nuevo ModelTransformation
    return await this.articleModelTransformationService.create(
      articleModelTransformation
    )
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
