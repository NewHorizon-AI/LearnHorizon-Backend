import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { CategorySwaggerDocs } from '../documentation/category.swagger'

export class UpdateCategoryDto extends CategorySwaggerDocs {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string
}
