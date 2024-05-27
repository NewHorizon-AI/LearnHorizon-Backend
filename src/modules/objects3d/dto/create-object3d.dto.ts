import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  ArrayMinSize,
  IsNumber,
  IsString,
  IsNotEmpty
} from 'class-validator'

export class CreateObject3DDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any

  @ApiProperty({
    description: 'Nombre del modelo 3D',
    example: 'Modelo de ejemplo'
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Coordenadas [x, y, z]',
    type: [Number],
    example: [10, 20, 30]
  })
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  coordinates: number[]

  @ApiProperty({
    description: 'Ángulos de rotación [x, y, z]',
    type: [Number],
    example: [45, 30, 60]
  })
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  rotationAngles: number[]

  @ApiProperty({
    description: 'Escala [x, y, z]',
    type: [Number],
    example: [1, 1, 1]
  })
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  scale: number[]
}
