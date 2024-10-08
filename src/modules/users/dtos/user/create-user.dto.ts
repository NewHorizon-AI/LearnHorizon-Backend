import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'user123',
    description: 'Nombre único de usuario, entre 3 y 30 caracteres'
  })
  @IsString()
  @Length(3, 30)
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario, debe tener un formato válido'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'P@ssw0rd2024!',
    description: 'Contraseña del usuario, al menos 8 caracteres'
  })
  @IsString()
  @Length(8)
  @IsNotEmpty()
  password: string
}
