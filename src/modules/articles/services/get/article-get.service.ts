import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article } from '../../schemas/article.schema'
import { ArticleComment } from '../../schemas/articleComment.schema'
import { ArticleData } from '../../schemas/articleData.schema'
import { ArticleMarkdown } from '../../schemas/articleMarkdown.schema'
import { ArticleTag } from '../../schemas/articleTag.schema'
import { ArticleUser } from '../../schemas/articleUser.schema'

@Injectable()
export class ArticleGetService {
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

  async findOneComplete(id: string): Promise<any> {
    const article = await this.articleModel.findById(id).exec()
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    const result = { ...article.toObject() }

    result.comments = await this.articleCommentModel
      .find({ article_id: id })
      .exec()
    result.data = await this.articleDataModel.findOne({ article_id: id }).exec()
    result.markdown = await this.articleMarkdownModel
      .findOne({ article_id: id })
      .exec()
    result.tags = await this.articleTagModel.find({ article_id: id }).exec()
    result.users = await this.articleUserModel.find({ article_id: id }).exec()

    return result
  }
}
