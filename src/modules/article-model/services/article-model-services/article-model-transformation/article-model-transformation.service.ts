import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

// * (1) Importar Esquemas
import { ArticleModelTransformation } from '../../../schemas/transformation.schema'

// * (2) Importar Dtos
import { CreateArticleModelTransformationDto } from '../../../dtos/article-model-transformation/create-article-model-transformation.dto'
import { UpdateModelTransformationDto } from '../../../dtos/article-model-transformation/update-article-model-transformation.dto'

@Injectable()
export class ArticleModelTransformationService {
  constructor(
    @InjectModel(ArticleModelTransformation.name)
    private articleTransformationModel: Model<ArticleModelTransformation>
  ) {}

  // ! POST - Create

  async create(
    createArticleModelTransformationDto?: CreateArticleModelTransformationDto
  ): Promise<ArticleModelTransformation> {
    /*
     * Crea un nuevo Article Model Transformation utilizando el DTO proporcionado
     @ Param createArticleModelTransformationDto: DTO que contiene los datos necesarios para crear un nuevo Article Model Transformation
     */
    try {
      // * (3) Crear un nuevo ModelTransformation
      return await this.articleTransformationModel.create(
        createArticleModelTransformationDto
      )
    } catch (error) {
      // * (2) Manejar errores
      throw new NotFoundException(error.message)
    }
  }

  // ! GET - Read

  async findOne(article_model_id: string): Promise<ArticleModelTransformation> {
    try {
      const modelTransformation = await this.articleTransformationModel
        .findById({ article_model_id: article_model_id })
        .exec()
      if (!modelTransformation) {
        throw new NotFoundException(
          `ArticleModelTransformation with ID ${article_model_id} not found`
        )
      }
      return modelTransformation
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async findOneByArticleModelId(
    article_model_id: Types.ObjectId
  ): Promise<ArticleModelTransformation> {
    const modelTransformation = await this.articleTransformationModel
      .findOne({ article_model_id: article_model_id })
      .exec()

    if (!modelTransformation) {
      throw new NotFoundException(
        `ModelTransformation with article_model_id ${article_model_id} not found`
      )
    }
    return modelTransformation
  }

  // ! PUT - Update

  async update(
    id: string,
    updateModelTransformationDto: UpdateModelTransformationDto
  ): Promise<ArticleModelTransformation> {
    const updatedModelTransformation = await this.articleTransformationModel
      .findByIdAndUpdate(id, updateModelTransformationDto, { new: true })
      .exec()
    if (!updatedModelTransformation) {
      throw new NotFoundException(
        `ArticleModelTransformation with ID ${id} not found`
      )
    }
    return updatedModelTransformation
  }

  // ! DELETE - Remove

  async deleteTransformationsByModelId(modelId: Types.ObjectId): Promise<void> {
    await this.articleTransformationModel.deleteMany({
      article_model_id: modelId
    })
  }
}
