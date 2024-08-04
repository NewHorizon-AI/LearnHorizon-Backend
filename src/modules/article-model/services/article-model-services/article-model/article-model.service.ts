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
    try {
      const newArticleModel = new this.articleModelModel(createArticleModelDto)
      return await newArticleModel.save()
    } catch (error) {
      throw new BadRequestException(
        `Failed to create ArticleModel: ${error.message}`
      )
    }
  }

  async createWithDefault(article_id: Types.ObjectId): Promise<ArticleModel> {
    return await this.articleModelModel.create({ article_id: article_id })
  }

  // ! GET - Read

  async findAll(): Promise<ArticleModel[]> {
    return this.articleModelModel.find().exec()
  }

  async findOneArticleModel(article_id: string): Promise<ArticleModel> {
    const articleModel = await this.articleModelModel.findOne({
      article_id: article_id
    })

    console.log(articleModel)
    if (!articleModel) {
      throw new NotFoundException(
        `ArticleModel with ID ${article_id} not found`
      )
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

  async remove(id: string): Promise<ArticleModel> {
    const deletedArticleModel = await this.articleModelModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedArticleModel) {
      throw new NotFoundException(`ArticleModel with ID ${id} not found`)
    }
    return deletedArticleModel
  }
}
