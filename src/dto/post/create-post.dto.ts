import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsDate
} from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  photo: string

  @IsNotEmpty()
  @IsString()
  subtitle: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  markdownContent: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[]

  @IsOptional()
  @IsDate()
  publicationDate: Date

  @IsOptional()
  @Min(0)
  views: number

  @IsOptional()
  @Min(0)
  likes: number

  @IsOptional()
  @Min(0)
  dislikes: number

  @IsNotEmpty()
  author: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsNotEmpty()
  category: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  @IsEnum(['published', 'review', 'draft'])
  status: string

  @IsOptional()
  @IsArray()
  comments: string[] // Esto debería ser un array de ObjectId, pero los validadores de class-validator no soportan ObjectId.
}
