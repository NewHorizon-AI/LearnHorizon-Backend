import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ timestamps: true })
export class File extends Document {
  @ApiProperty({
    description: 'Nombre del archivo',
    example: 'model.gltf'
  })
  @Prop({ required: true })
  filename: string

  @ApiProperty({
    description: 'Ruta del archivo en el servidor',
    example: 'uploads/model.gltf'
  })
  @Prop({ required: true })
  path: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'model/gltf+json'
  })
  @Prop({ required: true })
  mimetype: string
}

export const FileSchema = SchemaFactory.createForClass(File)
