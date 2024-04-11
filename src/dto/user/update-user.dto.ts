import {
  IsEmail,
  IsOptional,
  IsString,
  Min,
  IsBoolean,
  IsDate
} from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
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

  @IsOptional()
  @IsEmail()
  email: string
}
