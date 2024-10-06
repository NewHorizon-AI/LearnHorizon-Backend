import { IsNotEmpty, IsString, MaxLength, IsInt, Min } from 'class-validator'
import { CategorySwaggerDocs } from '../documentation/category.swagger'

export class CreateCategoryDto implements CategorySwaggerDocs {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string

  @IsInt()
  @Min(0)
  numberOfArticles: number
}
