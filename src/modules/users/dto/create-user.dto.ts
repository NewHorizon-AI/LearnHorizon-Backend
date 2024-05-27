import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsBoolean,
  IsDate
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'URL de la imagen del usuario',
    example: 'https://example.com/image.jpg'
  })
  image?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John Doe'
  })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'johndoe'
  })
  username: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123'
  })
  password: string

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de seguidores',
    example: 100
  })
  followers: number

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Permisos de edición del usuario',
    example: true
  })
  editPermissions: boolean

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Biografía del usuario',
    example: 'This is a biography.'
  })
  biography: string

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Fecha de creación del usuario',
    example: '2024-05-20T18:25:43.511Z'
  })
  creationDate: Date

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'johndoe@example.com'
  })
  email: string
}
