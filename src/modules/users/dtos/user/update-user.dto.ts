import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    example: 'user123',
    description: 'Nombre único de usuario, entre 3 y 30 caracteres',
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  username?: string

  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario, debe tener un formato válido',
    required: false
  })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({
    example: 'P@ssw0rd2024!',
    description: 'Contraseña del usuario, al menos 8 caracteres',
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(8)
  password?: string

  @ApiProperty({
    example: '2024-07-15T08:00:00.000Z',
    description: 'Fecha del último inicio de sesión',
    required: false
  })
  @IsOptional()
  lastLogin?: Date
}
