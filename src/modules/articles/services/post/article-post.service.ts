import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateArticleCompleteDto } from '../../dto/article/create-article-complete.dto'
import { Article } from '../../schemas/article.schema'
import { ArticleComment } from '../../schemas/article-comment.schema'
import { ArticleData } from '../../schemas/article-data.schema'
import { ArticleMarkdown } from '../../schemas/article-markdown.schema'
import { ArticleTag } from '../../schemas/article-tag.schema'
import { ArticleUser } from '../../schemas/article-user.schema'

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

  async createComplete(
    createArticleCompleteDto: CreateArticleCompleteDto
  ): Promise<void> {
    const { article, comments, data, markdown, tags, users } =
      createArticleCompleteDto

    const createdArticle = new this.articleModel(article)
    await createdArticle.save()

    if (comments) {
      await Promise.all(
        comments.map(async (comment) => {
          const newComment = new this.articleCommentModel({
            ...comment,
            article_id: createdArticle._id
          })
          await newComment.save()
        })
      )
    }

    if (data) {
      const newData = new this.articleDataModel({
        ...data,
        article_id: createdArticle._id
      })
      await newData.save()
    }

    if (markdown) {
      const newMarkdown = new this.articleMarkdownModel({
        ...markdown,
        article_id: createdArticle._id
      })
      await newMarkdown.save()
    }

    if (tags) {
      await Promise.all(
        tags.map(async (tag) => {
          const newTag = new this.articleTagModel({
            ...tag,
            article_id: createdArticle._id
          })
          await newTag.save()
        })
      )
    }

    if (users) {
      await Promise.all(
        users.map(async (user) => {
          const newUser = new this.articleUserModel({
            ...user,
            article_id: createdArticle._id
          })
          await newUser.save()
        })
      )
    }
  }
}
