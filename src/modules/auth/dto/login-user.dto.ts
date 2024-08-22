import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    description: 'Nombre único de usuario, debe ser único en el sistema',
    example: 'john_doe'
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena.' })
  username?: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com'
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  email?: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Ex@mplePassw0rd2024!'
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string
}
