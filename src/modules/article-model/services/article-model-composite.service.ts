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

  async createArticleModel(article_id: string): Promise<ArticleModel> {
    /*
     * Crea un nuevo ArticleModel con el article_id proporcionado, para ser utilizado en la creación de un nuevo articleModel
     @ Param article_id ID del artículo al que se asociará el ArticleModel
     */

    // * (1) Verifica que el article_id no sea nulo y crea la instancia de CreateArticleModelDto
    const object_article_id = new Types.ObjectId(article_id)

    const articleModel: CreateArticleModelDto = {
      article_id: object_article_id
    }

    // * (2) Crea un nuevo ArticleModel
    return await this.articleModelService.create(articleModel)
  }

  async createArticleModelTransformation(
    article_model_id: Types.ObjectId
  ): Promise<ArticleModelTransformation> {
    /*
     * Crea un nuevo ModelTransformation con el article_model_id proporcionado, para ser utilizado en la creación de un nuevo articleModelTransformation
     */

    // * (1) Crea un nuevo ModelTransformation

    const object_article_model_id = new Types.ObjectId(article_model_id)

    const createArticleModelTransformationDto: CreateArticleModelTransformationDto =
      {
        article_model_id: object_article_model_id
      }

    return await this.articleModelTransformationService.create(
      createArticleModelTransformationDto
    )
  }

  // ! GET - find

  async getTransformationById(
    article_id: Types.ObjectId
  ): Promise<ArticleModelTransformation> {
    /*
     * Obtiene un ModelTransformation por article_id
     @ Param article_id ID del artículo a recuperar
    */

    // * (1) Buscar el ArticleModel usando article_id
    const articleModel =
      await this.articleModelService.getArticleModelByArticleId(article_id)

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
  }

  async getArticleModelByArticleId(article_id: string): Promise<ArticleModel> {
    /*
     * Obtiene un ArticleModel por article_id
     @ Param article_id ID del artículo a recuperar
    */
    try {
      // * (1) Buscar el ArticleModel usando article_id

      const articleModel =
        await this.articleModelService.getByArticleId(article_id)

      if (!articleModel) {
        throw new NotFoundException(
          `ArticleModel with ID ${article_id} not found`
        )
      }
      return articleModel
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
