import { ApiProperty } from '@nestjs/swagger'
import { IsObject, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { UpdateUserDto } from './user/update-user.dto'
import { UpdateUserDetailsDto } from './user-details/update-user-details.dto'

export class UpdateUserWithDetailsDto {
  @ApiProperty({ type: UpdateUserDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  updateUser?: UpdateUserDto

  @ApiProperty({ type: UpdateUserDetailsDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDetailsDto)
  updateUserDetails?: UpdateUserDetailsDto
}
