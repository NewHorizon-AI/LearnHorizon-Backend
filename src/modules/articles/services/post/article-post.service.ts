import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateArticleCompleteDto } from '../../dto/create-article-complete.dto'
import { Article } from '../../schemas/article.schema'
import { ArticleComment } from '../../schemas/articleComment.schema'
import { ArticleData } from '../../schemas/articleData.schema'
import { ArticleMarkdown } from '../../schemas/articleMarkdown.schema'
import { ArticleTag } from '../../schemas/articleTag.schema'
import { ArticleUser } from '../../schemas/articleUser.schema'

@Injectable()
export class ArticlePostService {
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

  private async handleRelatedEntities(entities, articleId, session) {
    const models = {
      comments: this.articleCommentModel,
      data: this.articleDataModel,
      markdown: this.articleMarkdownModel,
      tags: this.articleTagModel,
      users: this.articleUserModel
    }

    for (const [key, model] of Object.entries(models)) {
      if (entities[key]) {
        await model.deleteMany({ article_id: articleId }).session(session)
        for (const entity of entities[key]) {
          const newEntity = new model({
            ...entity,
            article_id: articleId
          })
          await newEntity.save({ session })
        }
      }
    }
  }

  async createComplete(
    createArticleCompleteDto: CreateArticleCompleteDto
  ): Promise<Article> {
    const session = await this.articleModel.db.startSession()
    session.startTransaction()

    try {
      const createdArticle = new this.articleModel(
        createArticleCompleteDto.article
      )
      await createdArticle.save({ session })

      await this.handleRelatedEntities(
        createArticleCompleteDto,
        createdArticle._id,
        session
      )

      await session.commitTransaction()
      return createdArticle
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
}
