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

// ¿Cómo manejo las relaciones entre usuarios, publicaciones y categorías en MongoDB y Mongoose, incluyendo seguir y dejar de seguir categorías, guardar y desguardar publicaciones, y manejar la eliminación de publicaciones?

// Modelado de datos: Primero, necesitas modelar tus datos para representar las relaciones entre usuarios, publicaciones y categorías. Puedes hacer esto agregando campos a tu esquema User que son arreglos de referencias a los esquemas Publication y Category:
// @Schema()
// export class User extends Document {
//   // ... otras propiedades ...

//   @Prop([{ type: Types.ObjectId, ref: 'Category' }])
//   followedCategories: Category[]

//   @Prop([{ type: Types.ObjectId, ref: 'Publication' }])
//   savedPublications: Publication[]

//   @Prop([{ type: Types.ObjectId, ref: 'Publication' }])
//   favorites: Publication[]

//   // ... otras propiedades ...
// }
// Seguir y dejar de seguir categorías: Para permitir a los usuarios seguir y dejar de seguir categorías, puedes agregar métodos a tu servicio UserService que usen los métodos push y pull (o addToSet y pull) de Mongoose para agregar y eliminar IDs de categorías de la lista followedCategories de un usuario:
// async followCategory(userId: string, categoryId: string): Promise<User> {
//   return this.userModel.findByIdAndUpdate(
//     userId,
//     { $addToSet: { followedCategories: categoryId } },
//     { new: true }
//   ).exec();
// }

// async unfollowCategory(userId: string, categoryId: string): Promise<User> {
//   return this.userModel.findByIdAndUpdate(
//     userId,
//     { $pull: { followedCategories: categoryId } },
//     { new: true }
//   ).exec();
// }
// Guardar y desguardar publicaciones: De manera similar, puedes agregar métodos a tu servicio UserService que permitan a los usuarios guardar y desguardar publicaciones:

// async savePublication(userId: string, publicationId: string): Promise<User> {
//   return this.userModel.findByIdAndUpdate(
//     userId,
//     { $addToSet: { savedPublications: publicationId } },
//     { new: true }
//   ).exec();
// }

// async unsavePublication(userId: string, publicationId: string): Promise<User> {
//   return this.userModel.findByIdAndUpdate(
//     userId,
//     { $pull: { savedPublications: publicationId } },
//     { new: true }
//   ).exec();
// }
// Manejo de la eliminación de publicaciones: Para asegurarte de que cuando una publicación se elimina, también se elimina de las listas de publicaciones guardadas y favoritas de todos los usuarios, puedes utilizar el middleware de Mongoose. Puedes definir un middleware pre('remove') en tu esquema Publication que encuentre todos los usuarios que tienen esa publicación en sus listas y la elimine de esas listas:
// @Schema()
// export class Publication extends Document {
//   // ... otras propiedades ...

//   async preRemove() {
//     const User = this.model('User')

//     const users = await User.find({
//       $or: [{ savedPublications: this._id }, { favorites: this._id }]
//     })

//     for (let user of users) {
//       user.savedPublications.pull(this._id)
//       user.favorites.pull(this._id)
//       await user.save()
//     }
//   }
// }
