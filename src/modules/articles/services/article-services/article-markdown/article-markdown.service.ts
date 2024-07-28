import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importacion de DTOs
import { CreateArticleMarkdownDto } from '../../../dtos/article/article-markdown/create-article-markdown.dto'
import { UpdateArticleMarkdownDto } from '../../../dtos/article/article-markdown/update-article-markdown.dto'

// Importar esquema de artículo
import { ArticleMarkdown } from '../../../schemas/article-markdown.schema'

@Injectable()
export class ArticleMarkdownService {
  constructor(
    @InjectModel(ArticleMarkdown.name)
    private articleModel: Model<ArticleMarkdown>
  ) {}

  async createArticleMarkdown(
    createArticleMarkdownDto: CreateArticleMarkdownDto
  ): Promise<ArticleMarkdown> {
    const newArticleMarkdown = new this.articleModel(createArticleMarkdownDto)
    return newArticleMarkdown.save()
  }

  async findAllArticleMarkdown(): Promise<ArticleMarkdown[]> {
    return await this.articleModel.find().exec()
  }

  async findArticleMarkdownById(id: string): Promise<ArticleMarkdown> {
    const articleMarkdown = await this.articleModel.findById(id).exec()
    if (!articleMarkdown) {
      throw new NotFoundException(`ArticleMarkdown with ID ${id} not found`)
    }
    return articleMarkdown
  }

  async updateArticleMarkdown(
    id: string,
    updateArticleMarkdownDto: UpdateArticleMarkdownDto
  ): Promise<ArticleMarkdown> {
    const updatedArticleMarkdown = await this.articleModel
      .findByIdAndUpdate(id, updateArticleMarkdownDto, { new: true })
      .exec()
    if (!updatedArticleMarkdown) {
      throw new NotFoundException(`ArticleMarkdown with ID ${id} not found`)
    }
    return updatedArticleMarkdown
  }

  async deleteArticleMarkdown(id: string): Promise<ArticleMarkdown> {
    const deletedArticleMarkdown = await this.articleModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedArticleMarkdown) {
      throw new NotFoundException(`ArticleMarkdown with ID ${id} not found`)
    }
    return deletedArticleMarkdown
  }
}
