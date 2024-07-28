import { Injectable, NotFoundException } from '@nestjs/common'
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
    @InjectModel(ArticleData.name) private articleModel: Model<ArticleData>
  ) {}

  async createArticleData(
    CreateArticleDataDto: CreateArticleDataDto
  ): Promise<ArticleData> {
    const newArticleData = new this.articleModel(CreateArticleDataDto)
    return newArticleData.save()
  }

  async findAllArticleData(): Promise<ArticleData[]> {
    return await this.articleModel.find().exec()
  }

  async findArticleDataById(id: string): Promise<ArticleData> {
    const articleData = await this.articleModel.findById(id).exec()
    if (!articleData) {
      throw new NotFoundException(`ArticleData with ID ${id} not found`)
    }
    return articleData
  }

  async updateArticleData(
    id: string,
    updateArticleDataDto: UpdateArticleDataDto
  ): Promise<ArticleData> {
    const updatedArticleData = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDataDto, { new: true })
      .exec()
    if (!updatedArticleData) {
      throw new NotFoundException(`ArticleData with ID ${id} not found`)
    }
    return updatedArticleData
  }

  async deleteArticleData(id: string): Promise<ArticleData> {
    const deletedArticleData = await this.articleModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedArticleData) {
      throw new NotFoundException(`ArticleData with ID ${id} not found`)
    }
    return deletedArticleData
  }
}
