import { ApiProperty } from '@nestjs/swagger'

import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

export class CreateSceneSettingsDto {
  @ApiProperty({
    description: 'Id del articulo al que pertenece la escena',
    example: '670d81e23c090bdc343c9eba'
  })
  @IsMongoId()
  @IsNotEmpty()
  articleId: string

  @ApiProperty({
    description: 'Id de las configuraciones de la camara de la escena'
  })
  @IsMongoId()
  @IsNotEmpty()
  cameraSettings: Types.ObjectId

  @ApiProperty({ description: 'Id de las configuraciones del grid' })
  @IsMongoId()
  @IsNotEmpty()
  gridSettings: Types.ObjectId

  @ApiProperty({ description: 'Id de las configuraciones del modelo' })
  @IsMongoId()
  @IsNotEmpty()
  modelSettings: Types.ObjectId

  @ApiProperty({
    description: 'Id de las configuraciones de las transformaciones'
  })
  @IsMongoId()
  @IsNotEmpty()
  transformationsSettings: Types.ObjectId
}
