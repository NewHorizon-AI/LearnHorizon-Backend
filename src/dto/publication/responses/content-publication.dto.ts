import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsDate
} from 'class-validator'

class ContentCardUserDto {
  @IsString()
  readonly _id: string

  @IsString()
  readonly name: string

  @IsOptional()
  @IsString()
  readonly image?: string
}

export class ContentCardDto {
  @IsString()
  readonly _id: string

  @IsString()
  readonly title: string

  @IsString()
  readonly photo: string

  @IsString()
  readonly description: string

  @IsNumber()
  readonly views: number

  @IsDate()
  readonly publicationDate: Date

  @IsArray()
  readonly author: ContentCardUserDto[]
}
