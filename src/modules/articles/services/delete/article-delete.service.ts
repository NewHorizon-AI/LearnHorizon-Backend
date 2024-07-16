import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Article } from '../../schemas/article.schema'
import { ArticleComment } from '../../schemas/article-comment.schema'
import { ArticleData } from '../../schemas/article-data.schema'
import { ArticleMarkdown } from '../../schemas/article-markdown.schema'
import { ArticleTag } from '../../schemas/article-tag.schema'
import { ArticleUser } from '../../schemas/article-user.schema'

@Injectable()
export class ArticleDeleteService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    @InjectModel(ArticleComment.name)
    private readonly articleCommentModel: Model<ArticleComment>,
    @InjectModel(ArticleData.name)
    private readonly articleDataModel: Model<ArticleData>,
    @InjectModel(ArticleMarkdown.name)
    private readonly articleMarkdownModel: Model<ArticleMarkdown>,
    @InjectModel(ArticleTag.name)
    private readonly articleTagModel: Model<ArticleTag>,
    @InjectModel(ArticleUser.name)
    private readonly articleUserModel: Model<ArticleUser>
  ) {}

  async remove(id: string): Promise<void> {
    const article = await this.articleModel.findById(id).exec()
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    await this.articleModel.findByIdAndDelete(id).exec()
    await this.articleCommentModel.deleteMany({ article_id: id }).exec()
    await this.articleDataModel.deleteOne({ article_id: id }).exec()
    await this.articleMarkdownModel.deleteOne({ article_id: id }).exec()
    await this.articleTagModel.deleteMany({ article_id: id }).exec()
    await this.articleUserModel.deleteMany({ article_id: id }).exec()
  }
}
