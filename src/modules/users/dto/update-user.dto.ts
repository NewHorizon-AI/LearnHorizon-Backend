import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiPropertyOptional({
    description: 'Nombre de usuario',
    example: 'johndoe'
  })
  username?: string

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    example: 'johndoe@example.com'
  })
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'La contraseña no debe exceder los 20 caracteres' })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe contener al menos una letra minúscula'
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe contener al menos una letra mayúscula'
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'La contraseña debe contener al menos un número'
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'La contraseña debe contener al menos un carácter especial'
  })
  @ApiPropertyOptional({
    description: 'Contraseña del usuario',
    example: 'Password123!'
  })
  password?: string
}
