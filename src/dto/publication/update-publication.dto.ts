import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Min,
  IsDate
} from 'class-validator'

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  photo: string

  @IsOptional()
  @IsString()
  subtitle: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
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

  @IsOptional()
  author: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  category: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  @IsEnum(['published', 'review', 'draft'])
  status: string

  @IsOptional()
  @IsArray()
  comments: string[] // Esto debería ser un array de ObjectId, pero los validadores de class-validator no soportan ObjectId.
}
