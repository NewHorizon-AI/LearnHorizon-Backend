import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

// * (1) Importar Esquemas
import { ArticleModel } from '../../../schemas/article-model.schema'

// * (2) Importar Dtos
import { CreateArticleModelDto } from '../../../dtos/article-model/create-article-model.dto'
import { UpdateArticleModelDto } from '../../../dtos/article-model/update-article-model.dto'

@Injectable()
export class ArticleModelService {
  constructor(
    @InjectModel(ArticleModel.name)
    private articleModelModel: Model<ArticleModel>
  ) {}

  // ! POST - Create

  async create(
    createArticleModelDto: CreateArticleModelDto
  ): Promise<ArticleModel> {
    /*
     * Crea un nuevo ArticleModel
      @ Param createArticleModelDto: DTO que contiene los datos necesarios para crear un nuevo ArticleModel
     */

    try {
      // * (3) Crea un nuevo ArticleModel
      return await this.articleModelModel.create(createArticleModelDto)
    } catch (error) {
      // * (2) Manejar errores
      throw new BadRequestException(
        `Failed to create ArticleModel: ${error.message}`
      )
    }
  }

  // ! GET - Read

  async findAll(): Promise<ArticleModel[]> {
    return this.articleModelModel.find().exec()
  }

  async getArticleModelByArticleId(
    article_id: Types.ObjectId
  ): Promise<ArticleModel> {
    /*
      * Obtiene un ArticleModel por article_id
      @ Param article_id ID del artículo para recuperar el Article
    */

    // * (1) Buscar el ArticleModel usando article_id
    // const articleModel = await this.articleModelModel.findOne({ article_id })

    const articleModel = await this.articleModelModel.findOne({
      article_id: new Types.ObjectId(article_id)
    })

    // * (2) Arronjar un error si el ArticleModel no existe
    if (!articleModel) {
      throw new NotFoundException(
        `ArticleModel with ID ${article_id} not found`
      )
    }
    return articleModel
  }

  async getModelByArticleId(articleId: string): Promise<ArticleModel> {
    /*
      * Recurso para obtener el articleModel por article_id
      @ Param article_id ID del artículo para recuperar el Article
    */

    const articleModel = await this.articleModelModel
      .findOne({ article_id: new Types.ObjectId(articleId) })
      .exec()

    if (!articleModel) {
      throw new NotFoundException(`ArticleModel with ID ${articleId} not found`)
    }

    return articleModel
  }

  // ! PUT - Update

  async update(
    id: string,
    updateArticleModelDto: UpdateArticleModelDto
  ): Promise<ArticleModel> {
    const updatedArticleModel = await this.articleModelModel
      .findByIdAndUpdate(id, updateArticleModelDto, { new: true })
      .exec()
    if (!updatedArticleModel) {
      throw new NotFoundException(`ArticleModel with ID ${id} not found`)
    }
    return updatedArticleModel
  }

  // ! DELETE - Remove

  async deleteArticleModel(modelId: Types.ObjectId): Promise<void> {
    await this.articleModelModel.deleteMany({ article_model_id: modelId })
  }
}
