import { IsString, IsNotEmpty, IsMimeType, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateGltfUploadDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  article_entry_id: string

  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @IsString()
  @IsNotEmpty()
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @IsString()
  @IsNotEmpty()
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @IsMimeType()
  @IsNotEmpty()
  mimetype: string
}
