import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

// * (1) Importar Esquemas
import { ArticleModelTransformation } from '../../../schemas/article-model-transformation.schema'
import { ArticleModel } from '../../../schemas/article-model.schema'

// * (2) Importar Dtos
// import { CreateArticleModelTransformationDto } from '../../../dtos/article-model-transformation/create-article-model-transformation.dto'
import { UpdateModelTransformationDto } from '../../../dtos/article-model-transformation/update-article-model-transformation.dto'

@Injectable()
export class ArticleModelTransformationService {
  constructor(
    @InjectModel(ArticleModel.name)
    private articleModelModel: Model<ArticleModel>,
    @InjectModel(ArticleModelTransformation.name)
    private modelTransformationModel: Model<ArticleModelTransformation>
  ) {}

  // ! POST - Create

  // async create(
  //   article_id: ,
  //   createArticleModelTransformationDto: CreateArticleModelTransformationDto
  // ): Promise<ArticleModelTransformation> {
  //   try {
  //     const newModelTransformation = await this.modelTransformationModel.create(
  //       { article_model_id: article_id, createArticleModelTransformationDto }
  //     )
  //     return newModelTransformation
  //   } catch (error) {
  //     throw new BadRequestException(
  //       `Failed to create ArticleModelTransformation: ${error.message}`
  //     )
  //   }
  // }

  async createWithDefault(
    article_model: ArticleModel
  ): Promise<ArticleModelTransformation> {
    /*
    @ Param article_model: ArticleModel - Modelo de artículo al que se le aplicará la transformación
    */
    return await this.modelTransformationModel.create({
      article_model_id: article_model._id
    })
  }

  // ! GET - Read

  async findOne(article_model_id: string): Promise<ArticleModelTransformation> {
    try {
      const modelTransformation = await this.modelTransformationModel
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
    console.log(article_model_id)
    const modelTransformation = await this.modelTransformationModel
      .findOne({ article_model_id: article_model_id })
      .exec()

    if (!modelTransformation) {
      throw new NotFoundException(
        `ModelTransformation with article_model_id ${article_model_id} not found`
      )
    }
    return modelTransformation
  }

  async update(
    id: string,
    updateModelTransformationDto: UpdateModelTransformationDto
  ): Promise<ArticleModelTransformation> {
    const updatedModelTransformation = await this.modelTransformationModel
      .findByIdAndUpdate(id, updateModelTransformationDto, { new: true })
      .exec()
    if (!updatedModelTransformation) {
      throw new NotFoundException(
        `ArticleModelTransformation with ID ${id} not found`
      )
    }
    return updatedModelTransformation
  }

  async remove(id: string): Promise<ArticleModelTransformation> {
    const deletedModelTransformation = await this.modelTransformationModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedModelTransformation) {
      throw new NotFoundException(
        `ArticleModelTransformation with ID ${id} not found`
      )
    }
    return deletedModelTransformation
  }
}
