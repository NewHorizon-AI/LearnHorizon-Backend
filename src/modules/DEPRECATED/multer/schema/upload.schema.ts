import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UploadDocument = Upload & Document

@Schema()
export class Upload {
  @Prop({ required: true })
  filename: string

  @Prop({ required: true })
  path: string

  @Prop({ required: true })
  mimetype: string

  @Prop({ default: Date.now })
  uploadedAt: Date
}

export const UploadSchema = SchemaFactory.createForClass(Upload)
