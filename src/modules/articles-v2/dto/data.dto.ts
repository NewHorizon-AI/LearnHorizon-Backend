import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsUrl,
  IsOptional,
  IsInt,
  Min
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PostDataDocs } from '../docs/swagger/dto/data.doc'

export class CreateArticleDataDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty(PostDataDocs.article_id)
  article_id: string

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty(PostDataDocs.photo)
  photo: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(PostDataDocs.description)
  description: string

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty(PostDataDocs.views)
  views?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty(PostDataDocs.likes)
  likes?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty(PostDataDocs.dislikes)
  dislikes?: number
}
