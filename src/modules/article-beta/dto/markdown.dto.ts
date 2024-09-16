import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PostMarkdownDocs } from '../docs/swagger/dto/markdown.doc'

export class PostMarkdownDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty(PostMarkdownDocs.article_id)
  article_id: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(PostMarkdownDocs.content)
  content: string
}
