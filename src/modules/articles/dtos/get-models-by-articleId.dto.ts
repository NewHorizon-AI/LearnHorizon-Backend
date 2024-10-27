import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty } from 'class-validator'

export class GetAllModelsByArticleIdDto {
  @ApiProperty({
    description: 'Identificador del articulo',
    example: '6705c5e6a32ebafb45d0f14e'
  })
  @IsNotEmpty()
  @IsMongoId()
  articleId: string
}
