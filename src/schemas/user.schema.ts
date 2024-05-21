import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  // Propiedad de tipo cadena que almacena la foto de perfil del usuario
  @Prop({ required: false })
  image?: string

  // Propiedad de tipo cadena que almacena el nombre del usuario
  @Prop({ required: true })
  name: string

  // Propiedad de tipo cadena que almacena el nombre unico de usuario
  @Prop({ required: true, unique: true })
  username: string

  // Propiedad de tipo cadena que almacena la contraseña del usuario
  @Prop({ required: true })
  password: string

  // Propiedad de tipo cadena que almacena los seguidres del usuario
  @Prop({ default: 0 })
  followers: number

  // Propiedad de tipo booleano que almacena si el usuario tiene permisos de edición
  @Prop({ default: false })
  editPermissions: boolean

  // Propiedad de tipo cadena que almacena la biografía del usuario
  @Prop()
  biography: string

  // Propiedad de tipo fecha que almacena la fecha de creación del usuario
  @Prop({ type: Date, default: Date.now })
  creationDate: Date

  // Propiedad de tipo cadena que almacena el correo electrónico del usuario
  @Prop({ required: true, unique: true })
  email: string
}

export const UserSchema = SchemaFactory.createForClass(User)
