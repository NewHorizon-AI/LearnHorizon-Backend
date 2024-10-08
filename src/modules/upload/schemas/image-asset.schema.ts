import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { DigitalAsset } from './digital-asset.schema' // Importar el esquema base

@Schema({ timestamps: true })
export class ImageAsset extends DigitalAsset {
  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'image/jpeg'
  })
  @Prop({
    required: true,
    default: 'image/jpeg',
    validate: {
      validator: (value: string) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        return allowedTypes.includes(value)
      },
      message: 'Tipo de archivo no permitido'
    }
  })
  mimetype: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes (máximo 5 MB para imágenes)',
    example: 5242880
  })
  @Prop({
    required: true,
    min: 0,
    max: 5242880 // 5MB
  })
  size: number

  @Prop({
    enum: ['procesando', 'optimizado', 'rechazado'],
    default: 'draft',
    index: true
  })
  status: string

  @ApiProperty({
    description: '¿La imagen ha sido optimizada?',
    example: true
  })
  @Prop({ default: false })
  isOptimized: boolean

  @ApiProperty({
    description: 'Orientación de la imagen',
    example: 'horizontal'
  })
  @Prop({ required: true })
  orientation: string

  @ApiProperty({
    description: '¿La imagen tiene un fondo transparente?',
    example: true
  })
  @Prop({ default: false })
  hasTransparentBackground: boolean
}

export const ImageAssetSchema = SchemaFactory.createForClass(ImageAsset)
