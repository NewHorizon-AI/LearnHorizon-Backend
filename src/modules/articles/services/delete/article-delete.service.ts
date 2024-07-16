import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article } from '../../schemas/article.schema'
import { ArticleComment } from '../../schemas/articleComment.schema'
import { ArticleData } from '../../schemas/articleData.schema'
import { ArticleMarkdown } from '../../schemas/articleMarkdown.schema'
import { ArticleTag } from '../../schemas/articleTag.schema'
import { ArticleUser } from '../../schemas/articleUser.schema'

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
    const session = await this.articleModel.db.startSession()
    session.startTransaction()

    try {
      await this.articleModel.findByIdAndRemove(id).session(session)

      const models = [
        this.articleCommentModel,
        this.articleDataModel,
        this.articleMarkdownModel,
        this.articleTagModel,
        this.articleUserModel
      ]

      for (const model of models) {
        await model.deleteMany({ article_id: id }).session(session)
      }

      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
}
