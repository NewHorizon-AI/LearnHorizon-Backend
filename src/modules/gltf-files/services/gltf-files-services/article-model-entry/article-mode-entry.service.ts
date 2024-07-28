import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importar Dtos
import { CreateArticleModelEntryDto } from '../../../dtos/file/article-model-entry/create-article-model-entry.dto'
import { UpdateArticleModelEntryDto } from '../../../dtos/file/article-model-entry/update-article-model-entry.dto'

// Importar Esquemas
import { ArticleModelEntry } from '../../../schemas/article-model-entry.schema'

@Injectable()
export class ArticleModelEntryService {
  constructor(
    @InjectModel(ArticleModelEntry.name)
    private articleModelEntryModel: Model<ArticleModelEntry>
  ) {}

  async createArticleModelEntry(
    createArticleModelEntryDto: CreateArticleModelEntryDto
  ): Promise<ArticleModelEntry> {
    const newArticleModelEntry = new this.articleModelEntryModel(
      createArticleModelEntryDto
    )
    return newArticleModelEntry.save()
  }

  async findAllArticleModelEntries(): Promise<ArticleModelEntry[]> {
    return this.articleModelEntryModel.find().exec()
  }

  async findArticleModelEntryById(id: string): Promise<ArticleModelEntry> {
    const articleModelEntry = await this.articleModelEntryModel
      .findById(id)
      .exec()
    if (!articleModelEntry) {
      throw new NotFoundException(`ArticleModelEntry with ID ${id} not found`)
    }
    return articleModelEntry
  }

  async updateArticleModelEntry(
    id: string,
    updateModelEntryDtio: UpdateArticleModelEntryDto
  ): Promise<ArticleModelEntry> {
    const updatedArticleModelEntry = await this.articleModelEntryModel
      .findByIdAndUpdate(id, updateModelEntryDtio, { new: true })
      .exec()
    if (!updatedArticleModelEntry) {
      throw new NotFoundException(`ArticleModelEntry with ID ${id} not found`)
    }
    return updatedArticleModelEntry
  }

  async deleteArticleModelEntry(id: string): Promise<ArticleModelEntry> {
    const deletedArticleModelEntry = await this.articleModelEntryModel
      .findByIdAndDelete(id)
      .exec()
    if (!deletedArticleModelEntry) {
      throw new NotFoundException(`ArticleModelEntry with ID ${id} not found`)
    }
    return deletedArticleModelEntry
  }
}
