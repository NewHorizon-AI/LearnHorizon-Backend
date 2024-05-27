import {
  IsEmail,
  IsOptional,
  IsString,
  Min,
  IsBoolean,
  IsDate
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'URL de la imagen del usuario',
    example: 'https://example.com/image.jpg'
  })
  image?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    example: 'John Doe'
  })
  name: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Nombre de usuario',
    example: 'johndoe'
  })
  username: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Contraseña del usuario',
    example: 'newpassword123'
  })
  password: string

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Número de seguidores',
    example: 150
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
    example: 'This is an updated biography.'
  })
  biography: string

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Fecha de creación del usuario',
    example: '2024-05-21T18:25:43.511Z'
  })
  creationDate: Date

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    example: 'johndoe@example.com'
  })
  email: string
}
