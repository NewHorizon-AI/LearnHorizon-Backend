import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class Object3D extends Document {
  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre del modelo 3D',
    example: 'Modelo de ejemplo'
  })
  name: string

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'File', required: true })
  @ApiProperty({
    description: 'Referencia al archivo subido',
    example: '603d2ef1b3f0a2168c6e89d1'
  })
  file: string
}

export const Object3DSchema = SchemaFactory.createForClass(Object3D)
