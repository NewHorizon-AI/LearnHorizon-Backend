import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateArticleCompleteDto } from '../../dto/article/update-article-complete.dto'
import { Article } from '../../schemas/article.schema'
import { ArticleComment } from '../../schemas/article-comment.schema'
import { ArticleData } from '../../schemas/article-data.schema'
import { ArticleMarkdown } from '../../schemas/article-markdown.schema'
import { ArticleTag } from '../../schemas/article-tag.schema'
import { ArticleUser } from '../../schemas/article-user.schema'

@Injectable()
export class ArticlePutService {
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

  async updateComplete(
    id: string,
    updateArticleCompleteDto: UpdateArticleCompleteDto
  ): Promise<void> {
    const { article, comments, data, markdown, tags, users } =
      updateArticleCompleteDto

    const existingArticle = await this.articleModel.findById(id)
    if (!existingArticle) {
      throw new NotFoundException('Article not found')
    }
    Object.assign(existingArticle, article)
    await existingArticle.save()

    if (comments) {
      await this.articleCommentModel.deleteMany({ article_id: id }).exec()
      await Promise.all(
        comments.map(async (comment) => {
          const newComment = new this.articleCommentModel({
            ...comment,
            article_id: id
          })
          await newComment.save()
        })
      )
    }

    if (data) {
      await this.articleDataModel
        .findOneAndUpdate(
          { article_id: id },
          { ...data, article_id: id },
          { upsert: true }
        )
        .exec()
    }

    if (markdown) {
      await this.articleMarkdownModel
        .findOneAndUpdate(
          { article_id: id },
          { ...markdown, article_id: id },
          { upsert: true }
        )
        .exec()
    }

    if (tags) {
      await this.articleTagModel.deleteMany({ article_id: id }).exec()
      await Promise.all(
        tags.map(async (tag) => {
          const newTag = new this.articleTagModel({ ...tag, article_id: id })
          await newTag.save()
        })
      )
    }

    if (users) {
      await this.articleUserModel.deleteMany({ article_id: id }).exec()
      await Promise.all(
        users.map(async (user) => {
          const newUser = new this.articleUserModel({ ...user, article_id: id })
          await newUser.save()
        })
      )
    }
  }
}
