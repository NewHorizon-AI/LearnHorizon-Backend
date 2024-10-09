import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ timestamps: true })
export class DigitalAsset extends Document {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @Prop({ required: true, index: true })
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @Prop({ required: true, index: true })
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @Prop({ required: true })
  mimetype: string

  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 1024
  })
  @Prop({ required: true })
  size: number

  @ApiProperty({
    description: 'Versión del archivo',
    example: 1
  })
  @Prop({ default: 1 })
  version: number

  @ApiProperty({
    description: '¿Es esta la última versión del archivo?',
    example: true
  })
  @Prop({ default: true })
  isLatestVersion: boolean

  @ApiProperty({
    description: 'Estado del archivo',
    example: 'published'
  })
  @Prop({
    enum: ['draft', 'published', 'rejected', 'in-review', 'pending-approval'],
    default: 'draft',
    index: true
  })
  status: string

  @ApiProperty({
    description: 'Hash del archivo para verificar integridad',
    example: 'sha256:9b74c9897bac770ffc029102a200c5de'
  })
  @Prop({ required: true })
  hash: string

  @ApiProperty({
    description: '¿Está el archivo marcado como eliminado?',
    example: false
  })
  @Prop({ default: false })
  isDeleted: boolean
}

export const DigitalAssetSchema = SchemaFactory.createForClass(DigitalAsset)
