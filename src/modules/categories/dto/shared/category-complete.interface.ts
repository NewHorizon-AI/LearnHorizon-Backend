import { Category } from '../../schemas/category.schema'
import { CategoryData } from '../../schemas/category-data.schema'
import { ArticleCategory } from '../../schemas/article-category.schema'

export interface CategoryComplete {
  category?: Category
  categoryData?: CategoryData
  articleCategory?: ArticleCategory[]
}
