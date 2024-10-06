import { ApiProperty } from '@nestjs/swagger'

export class CreateTransformationsSettingsDto {
  @ApiProperty({
    description: 'Escala del modelo',
    example: [1, 1, 1]
  })
  scale: number[]

  @ApiProperty({
    description: 'Rotación del modelo',
    example: [0, 0, 0]
  })
  rotation: number[]

  @ApiProperty({
    description: 'Posición del modelo',
    example: [0, 0, 0]
  })
  position: number[]
}
