import { Injectable, BadRequestException } from '@nestjs/common'

// * (1) Importar Esquemas
import { ArticleModel } from '../schemas/article-model.schema'
import { ModelTransformation } from '../schemas/article-model-transformation.schema'

// * (2) Importar Dtos
import { CreateArticleModelDto } from '../dtos/article-model/create-article-model.dto'
// import { CreateArticleModelTransformationDto } from '../dtos/article-model-transformation/create-article-model-transformation.dto'

// * (3) Importar Servicios
import { ArticleModelService } from './article-model-services/article-model/article-mode-.service'
import { ModelTransformationService } from './article-model-services/article-model-transformation/article-model-transformation.service'

@Injectable()
export class ArticleModelCompositeService {
  constructor(
    private readonly articleModelService: ArticleModelService,
    private readonly modelTransformationService: ModelTransformationService
  ) {}

  async createArticleModelWithTransformation(
    createArticleModelDto: CreateArticleModelDto
  ): Promise<{
    articleModel: ArticleModel
    modelTransformation: ModelTransformation
  }> {
    try {
      // * (1))Crear ArticleModel
      const articleModel = await this.articleModelService.create(
        createArticleModelDto
      )

      // * (3) Crear ModelTransformation usando el ID del ArticleModel recién creado
      const modelTransformation =
        await this.modelTransformationService.createWithDefault(
          articleModel.article_id
        )

      return { articleModel, modelTransformation }
    } catch (error) {
      // * (2) Manejar errores
      throw new BadRequestException(error.message)
    }
  }
}
