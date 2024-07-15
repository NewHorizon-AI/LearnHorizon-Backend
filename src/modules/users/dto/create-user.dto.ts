import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'johndoe'
  })
  username: string
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'johndoe@example.com'
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
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
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123!'
  })
  password: string
}
