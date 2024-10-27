import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { CategorySwaggerDocs } from '../documentation/category.swagger.dto'

export class CreateCategoryDto extends CategorySwaggerDocs {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string
}
