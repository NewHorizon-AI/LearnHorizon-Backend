import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsObject } from 'class-validator'

export class FiltersDto {
  @ApiPropertyOptional({
    description: 'Filtros dinámicos en formato JSON',
    example: { status: 'PUBLISHED', views: { $gt: 100 } }
  })
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>
}
