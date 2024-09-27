import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class CreateFileGltfDto {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @IsNotEmpty()
  @IsString()
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @IsNotEmpty()
  @IsString()
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @IsNotEmpty()
  @IsString()
  mimetype: string

  @ApiProperty({
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  })
  @IsNotEmpty()
  article_model_id: Types.ObjectId
}
