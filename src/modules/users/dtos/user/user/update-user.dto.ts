import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre único de usuario',
    example: 'john_doe'
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena.' })
  username?: string

  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    example: 'john.updated@example.com'
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  email?: string

  @ApiPropertyOptional({
    description: 'Contraseña del usuario',
    example: 'newEx@mplePassw0rd2024!'
  })
  @IsOptional()
  @Length(8, 50, {
    message: 'La contraseña debe tener entre 8 y 50 caracteres.'
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,50})/, {
    message:
      'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales.'
  })
  password?: string
}
