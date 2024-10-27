import { ApiProperty } from '@nestjs/swagger'
import { IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator'

export class GetArticleByUserIdDto {
  @ApiProperty({
    description: 'Autores del artículo',
    example: '["6705c5e6a32ebafb45d0f14e"]'
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  usersIds: string[]
}
