import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
  private _username: string

  @ApiProperty({
    description: 'Nombre único de usuario, debe ser único en el sistema',
    example: 'john_doe'
  })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena.' })
  @Transform(({ value }) => value.toLowerCase())
  username: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com'
  })
  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  email: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Ex@mplePassw0rd2024!'
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Length(8, 50, {
    message: 'La contraseña debe tener entre 8 y 50 caracteres.'
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,50})/, {
    message:
      'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales.'
  })
  password: string
}
