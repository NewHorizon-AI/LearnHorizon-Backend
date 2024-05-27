import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class Object3D extends Document {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre del modelo 3D',
    example: 'Modelo de ejemplo'
  })
  name: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Contenido del archivo 3D en formato base64',
    example: 'data:model/gltf+json;base64,...'
  })
  content: string

  @Prop({ required: true })
  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 10485760
  })
  size: number

  @Prop({ required: true, type: [Number] })
  @ApiProperty({
    description: 'Coordenadas [x, y, z]',
    example: [10, 20, 30]
  })
  coordinates: number[]

  @Prop({ required: true, type: [Number] })
  @ApiProperty({
    description: 'Ángulos de rotación [x, y, z]',
    example: [45, 30, 60]
  })
  rotationAngles: number[]

  @Prop({ required: true, type: [Number] })
  @ApiProperty({
    description: 'Escala [x, y, z]',
    example: [1, 1, 1]
  })
  scale: number[]
}

export const Object3DSchema = SchemaFactory.createForClass(Object3D)
