import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

// Importacion de DTOs
import { CreateArticleMarkdownDto } from '../../../dtos/article/article-markdown/create-article-markdown.dto'
import { UpdateArticleMarkdownDto } from '../../../dtos/article/article-markdown/update-article-markdown.dto'

// Importar esquema de artículo
import { ArticleMarkdown } from '../../../schemas/article-markdown.schema'

@Injectable()
export class ArticleMarkdownService {
  constructor(
    @InjectModel(ArticleMarkdown.name)
    private articleMarkdownModel: Model<ArticleMarkdown>
  ) {}

  async createArticleMarkdown(
    createArticleMarkdownDto: CreateArticleMarkdownDto
  ): Promise<ArticleMarkdown> {
    const newArticleMarkdown = new this.articleMarkdownModel(
      createArticleMarkdownDto
    )
    return newArticleMarkdown.save()
  }

  async findAllArticleMarkdown(): Promise<ArticleMarkdown[]> {
    return await this.articleMarkdownModel.find().exec()
  }

  async findArticleMarkdownById(_id: string): Promise<ArticleMarkdown> {
    const articleMarkdown = await this.articleMarkdownModel.findById(_id).exec()
    if (!articleMarkdown) {
      throw new NotFoundException(`ArticleMarkdown with ID ${_id} not found`)
    }
    return articleMarkdown
  }

  // Busca los datos de un articulo descompuesto por su ID y retorna null si no existe
  async findCompositeArticleMarkdownById(
    article_id: Types.ObjectId
  ): Promise<ArticleMarkdown> {
    const article = await this.articleMarkdownModel
      .findOne({ article_id: article_id })
      .exec()
    if (!article) {
      return null
    }
    return article
  }

  async updateArticleMarkdown(
    id: string,
    updateArticleMarkdownDto: UpdateArticleMarkdownDto
  ): Promise<ArticleMarkdown> {
    const updatedArticleMarkdown = await this.articleMarkdownModel
      .findByIdAndUpdate(id, updateArticleMarkdownDto, { new: true })
      .exec()
    if (!updatedArticleMarkdown) {
      throw new NotFoundException(`ArticleMarkdown with ID ${id} not found`)
    }
    return updatedArticleMarkdown
  }

  async deleteArticleMarkdown(id: string): Promise<ArticleMarkdown> {
    const deletedArticleMarkdown = await this.articleMarkdownModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedArticleMarkdown) {
      throw new NotFoundException(`ArticleMarkdown with ID ${id} not found`)
    }
    return deletedArticleMarkdown
  }

  async updateCompleteArticleMarkdown(
    articleId: string,
    updateArticleMarkdownDto: UpdateArticleMarkdownDto
  ): Promise<ArticleMarkdown> {
    if (!articleId) {
      throw new BadRequestException('articleId is required')
    }

    if (!updateArticleMarkdownDto) {
      throw new BadRequestException('updateArticleMarkdownDto is required')
    }

    let articleMarkdown = await this.articleMarkdownModel
      .findOne({ article_id: articleId })
      .exec()

    if (!articleMarkdown) {
      // Crear un nuevo ArticleMarkdown si no existe
      articleMarkdown = new this.articleMarkdownModel({ article_id: articleId })
    }

    // Actualizar solo los campos que están presentes en updateArticleMarkdownDto
    for (const [key, value] of Object.entries(updateArticleMarkdownDto)) {
      if (value !== undefined) {
        articleMarkdown[key] = value
      }
    }

    try {
      return await articleMarkdown.save()
    } catch (error) {
      throw new BadRequestException(
        `Failed to update ArticleMarkdown: ${error.message}`
      )
    }
  }
}
