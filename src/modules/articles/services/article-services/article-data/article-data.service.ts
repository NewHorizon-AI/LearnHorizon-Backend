import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importacion de DTOs
import { CreateArticleDataDto } from '../../../dtos/article/article-data/create-article-data.dto'
import { UpdateArticleDataDto } from '../../../dtos/article/article-data/update-article-data.dto'

// Importar esquema de artículo
import { ArticleData } from '../../../schemas/article-data.schema'

@Injectable()
export class ArticleDataService {
  constructor(
    @InjectModel(ArticleData.name) private articleDataModel: Model<ArticleData>
  ) {}

  async createArticleData(
    CreateArticleDataDto: CreateArticleDataDto
  ): Promise<ArticleData> {
    const newArticleData = new this.articleDataModel(CreateArticleDataDto)
    return newArticleData.save()
  }

  async findAllArticleData(): Promise<ArticleData[]> {
    return await this.articleDataModel.find().exec()
  }

  async findArticleDataById(_id: string): Promise<ArticleData> {
    const articleData = await this.articleDataModel.findById(_id).exec()
    if (!articleData) {
      throw new NotFoundException(`ArticleData with ID ${_id} not found`)
    }
    return articleData
  }

  // Busca los datos de un articulo descompuesto por su ID y retorna null si no existe
  async findCompositeArticleDataById(article_id: string): Promise<ArticleData> {
    const article = await this.articleDataModel
      .findOne({ article_id: article_id })
      .exec()
    if (!article) {
      return null
    }
    return article
  }

  async updateArticleData(
    id: string,
    updateArticleDataDto: UpdateArticleDataDto
  ): Promise<ArticleData> {
    const updatedArticleData = await this.articleDataModel
      .findByIdAndUpdate(id, updateArticleDataDto, { new: true })
      .exec()
    if (!updatedArticleData) {
      throw new NotFoundException(`ArticleData with ID ${id} not found`)
    }
    return updatedArticleData
  }

  async updateCompleteArticleData(
    articleId: string,
    updateArticleDataDto: UpdateArticleDataDto
  ): Promise<ArticleData> {
    if (!articleId) {
      throw new BadRequestException('articleId is required')
    }

    if (!updateArticleDataDto) {
      throw new BadRequestException('updateArticleDataDto is required')
    }

    let articleData = await this.articleDataModel
      .findOne({ article_id: articleId })
      .exec()

    if (!articleData) {
      // Crear un nuevo ArticleData si no existe
      articleData = new this.articleDataModel({ article_id: articleId })
    }

    // Actualizar solo los campos que están presentes en updateArticleDataDto
    for (const [key, value] of Object.entries(updateArticleDataDto)) {
      if (value !== undefined) {
        articleData[key] = value
      }
    }

    try {
      return await articleData.save()
    } catch (error) {
      throw new BadRequestException(
        `Failed to update ArticleData: ${error.message}`
      )
    }
  }

  async deleteArticleData(id: string): Promise<ArticleData> {
    const deletedArticleData = await this.articleDataModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedArticleData) {
      throw new NotFoundException(`ArticleData with ID ${id} not found`)
    }
    return deletedArticleData
  }
}
