import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsInt, Length, Min } from 'class-validator'

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'Nombre del rol',
    example: 'Admin'
  })
  @IsOptional()
  @Length(3, 50)
  role_name?: string

  @ApiPropertyOptional({
    description: 'Descripción del rol',
    example: 'Administrador con todos los permisos actualizado'
  })
  @IsOptional()
  @Length(5, 100)
  description?: string

  @ApiPropertyOptional({
    description: 'Nivel de poder del rol',
    example: 15
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  power_level?: number
}
