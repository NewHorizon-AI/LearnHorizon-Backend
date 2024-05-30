import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type FileDocument = File & Document

@Schema()
export class File {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'example.glb'
  })
  filename: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Ruta del archivo en el sistema',
    example: '/uploads/example.glb'
  })
  path: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf-binary'
  })
  mimetype: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 10485760
  })
  size: number
}

export const FileSchema = SchemaFactory.createForClass(File)
