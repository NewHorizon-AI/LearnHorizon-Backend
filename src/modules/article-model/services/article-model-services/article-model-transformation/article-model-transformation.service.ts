import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// * (1) Importar Esquemas
import { ModelTransformation } from '../../../schemas/article-model-transformation.schema'
import { Article } from 'src/modules/articles/schemas/article.schema'

// * (2) Importar Dtos
import { CreateArticleModelTransformationDto } from '../../../dtos/article-model-transformation/create-article-model-transformation.dto'
import { UpdateModelTransformationDto } from '../../../dtos/article-model-transformation/update-article-model-transformation.dto'

@Injectable()
export class ModelTransformationService {
  constructor(
    @InjectModel(ModelTransformation.name)
    private modelTransformationModel: Model<ModelTransformation>
  ) {}

  async create(
    article_id: Article,
    createArticleModelTransformationDto: CreateArticleModelTransformationDto
  ): Promise<ModelTransformation> {
    try {
      const newModelTransformation = await this.modelTransformationModel.create(
        { article_model_id: article_id, createArticleModelTransformationDto }
      )
      return newModelTransformation
    } catch (error) {
      throw new BadRequestException(
        `Failed to create ModelTransformation: ${error.message}`
      )
    }
  }

  async createWithDefault(article_id: Article): Promise<ModelTransformation> {
    try {
      const newModelTransformation = await this.modelTransformationModel.create(
        { article_model_id: article_id }
      )
      return newModelTransformation
    } catch (error) {
      throw new BadRequestException(
        `Failed to create ModelTransformation: ${error.message}`
      )
    }
  }

  async findOne(id: string): Promise<ModelTransformation> {
    const modelTransformation = await this.modelTransformationModel
      .findById(id)
      .exec()
    if (!modelTransformation) {
      throw new NotFoundException(`ModelTransformation with ID ${id} not found`)
    }
    return modelTransformation
  }

  async update(
    id: string,
    updateModelTransformationDto: UpdateModelTransformationDto
  ): Promise<ModelTransformation> {
    const updatedModelTransformation = await this.modelTransformationModel
      .findByIdAndUpdate(id, updateModelTransformationDto, { new: true })
      .exec()
    if (!updatedModelTransformation) {
      throw new NotFoundException(`ModelTransformation with ID ${id} not found`)
    }
    return updatedModelTransformation
  }

  async remove(id: string): Promise<ModelTransformation> {
    const deletedModelTransformation = await this.modelTransformationModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedModelTransformation) {
      throw new NotFoundException(`ModelTransformation with ID ${id} not found`)
    }
    return deletedModelTransformation
  }
}
