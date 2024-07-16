import { Article } from '../../../schemas/article.schema'
import { ArticleComment } from '../../../schemas/article-comment.schema'
import { ArticleData } from '../../../schemas/article-data.schema'
import { ArticleMarkdown } from '../../../schemas/article-markdown.schema'
import { ArticleTag } from '../../../schemas/article-tag.schema'
import { ArticleUser } from '../../../schemas/article-user.schema'

export interface ArticleComplete {
  article?: Article
  comments?: ArticleComment[]
  data?: ArticleData
  markdown?: ArticleMarkdown
  tags?: ArticleTag[]
  users?: ArticleUser[]
}
