import { Type } from 'class-transformer'
import { IsInt, IsIn, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

enum OrderType {
  Ascendant = 'ascendant',
  Descendant = 'descendant'
}

export class QueryOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Número de la página actual en la paginación de resultados.',
    example: 1
  })
  page: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Cantidad de resultados por página.',
    example: 10
  })
  pageSize: number

  @IsIn([OrderType.Ascendant, OrderType.Descendant])
  @ApiProperty({
    description:
      'Especifica el orden de los resultados, ascendente o descendente.',
    example: OrderType.Ascendant,
    enum: OrderType
  })
  order: OrderType
}
