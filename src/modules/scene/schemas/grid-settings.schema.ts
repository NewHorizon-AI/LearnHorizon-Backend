import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class GridSettings extends Document {
  @ApiProperty({
    example: '#ffffff',
    description: 'Background color of the grid'
  })
  @Prop({ default: '#ffffff' })
  backgroundColor: string

  @ApiProperty({
    example: 20,
    description: 'Size of the grid'
  })
  @Prop({ default: 20 })
  size: number

  @ApiProperty({
    example: 15,
    description: 'Number of divisions in the grid'
  })
  @Prop({ default: 15 })
  divisions: number

  @ApiProperty({
    example: true,
    description: 'Defines whether the grid is visible or not'
  })
  @Prop({ default: true })
  gridVisible: boolean

  @ApiProperty({
    example: 1.0,
    description: 'Opacity level of the grid, from 0 to 1'
  })
  @Prop({ default: 1.0 })
  gridOpacity: number
}

export const GridSettingsSchema = SchemaFactory.createForClass(GridSettings)
