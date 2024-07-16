import { IsInt, IsIn, Min } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class FindParamsDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Número de la página',
    example: 1
  })
  page: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Tamaño de la página',
    example: 10
  })
  pageSize: number

  @IsIn(['ascendant', 'descendant'])
  @ApiProperty({
    description: 'Orden de los resultados',
    example: 'ascendant'
  })
  order: 'ascendant' | 'descendant'
}
