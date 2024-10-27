import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { DigitalAsset } from './digital-asset.schema'

@Schema({ timestamps: true })
export class GltfModelAsset extends DigitalAsset {
  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @Prop({
    required: true,
    default: 'model/gltf+json',
    validate: {
      validator: (value: string) => {
        const allowedTypes = [
          'model/gltf+json',
          'model/gltf-binary',
          'application/octet-stream'
        ]
        return allowedTypes.includes(value)
      },
      message: 'Tipo de archivo no permitido'
    }
  })
  mimetype: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes (máximo 50 MB para modelos GLTF)',
    example: 52428800
  })
  @Prop({
    required: true,
    min: 0,
    max: 52428800 // 50MB
  })
  size: number

  @Prop({
    enum: ['validando', 'validado', 'rechazado'],
    default: 'validando',
    index: true
  })
  status: string

  @ApiProperty({
    description: '¿El modelo GLTF ha sido validado?',
    example: true
  })
  @Prop({ default: false })
  isValidated: boolean
}

export const GltfModelAssetSchema = SchemaFactory.createForClass(GltfModelAsset)
