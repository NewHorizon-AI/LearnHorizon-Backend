import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsDate
} from 'class-validator'

export class CreateCommentDto {
  @IsNotEmpty()
  user: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsNotEmpty()
  @IsString()
  comment: string

  @IsOptional()
  @Min(0)
  likes: number

  @IsOptional()
  @Min(0)
  dislikes: number

  @IsOptional()
  @IsDate()
  commentDate: Date

  @IsOptional()
  @IsArray()
  replies: string[] // Esto debería ser un array de ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsNotEmpty()
  post: string // Esto debería ser un ObjectId, pero los validadores de class-validator no soportan ObjectId.

  @IsOptional()
  @IsBoolean()
  edited: boolean
}
