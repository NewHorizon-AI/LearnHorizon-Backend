import { IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateFileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'updated_model.gltf',
    required: false
  })
  filename?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/updated_model.gltf',
    required: false
  })
  path?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/updated_gltf+json',
    required: false
  })
  mimetype?: string
}
