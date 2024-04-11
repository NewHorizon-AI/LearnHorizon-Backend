import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsBoolean,
  IsDate
} from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  @IsString()
  image?: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @Min(0)
  followers: number

  @IsOptional()
  @IsBoolean()
  editPermissions: boolean

  @IsOptional()
  @IsString()
  biography: string

  @IsOptional()
  @IsDate()
  creationDate: Date

  @IsNotEmpty()
  @IsEmail()
  email: string
}
