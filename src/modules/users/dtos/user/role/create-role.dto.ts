import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsInt, Length, Min } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Admin',
    required: true
  })
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio.' })
  @Length(3, 50, {
    message: 'El nombre del rol debe tener entre 3 y 50 caracteres.'
  })
  role_name: string

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Administrador con todos los permisos',
    required: false
  })
  @IsOptional()
  @Length(5, 100, {
    message: 'La descripción debe tener entre 5 y 100 caracteres.'
  })
  description?: string

  @ApiProperty({
    description: 'Nivel de poder del rol',
    example: 10,
    required: true
  })
  @IsInt({ message: 'El nivel de poder debe ser un número entero.' })
  @Min(1, { message: 'El nivel de poder debe ser al menos 1.' })
  power_level: number
}
