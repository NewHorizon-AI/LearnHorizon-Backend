import { IsOptional, IsArray, IsNumber, ArrayMinSize } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateModelTransformationDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Escala del modelo',
    example: [1, 1, 1],
    default: [1, 1, 1]
  })
  scale?: number[]

  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Rotación del modelo',
    example: [0, 0, 0],
    default: [0, 0, 0]
  })
  rotation?: number[]

  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Posición del modelo',
    example: [0, 0, 0],
    default: [0, 0, 0]
  })
  position?: number[]
}
