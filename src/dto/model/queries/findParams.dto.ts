import { IsInt, IsIn } from 'class-validator'
import { Transform } from 'class-transformer'

export class FindParamsDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  page: number

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  pageSize: number

  @IsIn(['ascendant', 'descendant'])
  order: 'ascendant' | 'descendant'
}
