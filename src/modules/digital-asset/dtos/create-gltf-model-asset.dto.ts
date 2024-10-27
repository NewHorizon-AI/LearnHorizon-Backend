// src/digital-asset/dto/create-gltf-model-asset.dto.ts

import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  Max,
  Min,
  IsOptional
} from 'class-validator'

export class CreateGltfModelAssetDto {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @IsString()
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @IsString()
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json',
    default: 'model/gltf+json'
  })
  @IsString()
  mimetype: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes (máximo 50 MB para modelos GLTF)',
    example: 52428800
  })
  @IsNumber()
  @Min(0)
  @Max(52428800)
  size: number

  @ApiProperty({
    description: 'Hash del archivo para verificar integridad',
    example: 'sha256:9b74c9897bac770ffc029102a200c5de'
  })
  @IsString()
  hash: string

  @ApiProperty({
    description: 'Estado del archivo',
    example: 'validando',
    enum: ['validando', 'validado', 'rechazado'],
    default: 'draft'
  })
  @IsEnum(['validando', 'validado', 'rechazado'])
  @IsOptional()
  status?: string

  @ApiProperty({
    description: '¿El modelo GLTF ha sido validado?',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  isValidated?: boolean
}
