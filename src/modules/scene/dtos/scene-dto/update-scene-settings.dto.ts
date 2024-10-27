import { ApiProperty } from '@nestjs/swagger'

import { IsMongoId, IsOptional } from 'class-validator'
import { Types } from 'mongoose'

export class UpdateSceneSettingsDto {
  @ApiProperty({
    description: 'Id del articulo al que pertenece la escena',
    example: '670d81e23c090bdc343c9eba'
  })
  @IsMongoId()
  @IsOptional()
  articleId: string

  @ApiProperty({
    description: 'Id de las configuraciones de la camara de la escena',
    example: '670d81e23c090bdc343c9eba'
  })
  @IsMongoId()
  @IsOptional()
  cameraSettings: Types.ObjectId

  @ApiProperty({
    description: 'Id de las configuraciones del grid',
    example: '670d81e23c090bdc343c9eba'
  })
  @IsMongoId()
  @IsOptional()
  gridSettings: Types.ObjectId

  @ApiProperty({
    description: 'Id de las configuraciones del modelo',
    example: '670d81e23c090bdc343c9eba'
  })
  @IsMongoId()
  @IsOptional()
  modelSettings: Types.ObjectId

  @ApiProperty({
    description: 'Id de las configuraciones de las transformaciones',
    example: '670d81e23c090bdc343c9eba'
  })
  @IsMongoId()
  @IsOptional()
  transformationsSettings: Types.ObjectId
}
