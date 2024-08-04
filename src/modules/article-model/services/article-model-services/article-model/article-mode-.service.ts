import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

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

  async create(
    createArticleModelDto: CreateArticleModelDto
  ): Promise<ArticleModel> {
    const newArticleModel = new this.articleModelModel(createArticleModelDto)
    return newArticleModel.save()
  }

  async findAll(): Promise<ArticleModel[]> {
    return this.articleModelModel.find().exec()
  }

  async findOne(id: string): Promise<ArticleModel> {
    const articleModel = await this.articleModelModel.findById(id).exec()
    if (!articleModel) {
      throw new NotFoundException(`ArticleModel with ID ${id} not found`)
    }
    return articleModel
  }

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
