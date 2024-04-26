// Interfaces para los contratos de las respuestas de modelos de contenido

// Interfaz de los autores de un contenido
interface IContentAuthor {
  _id: string
  name: string
  image?: string
}

// Interfaz de las categorías de un contenido
interface IContentCategory {
  _id: string
  title: string
}

// Interfaz del modelo de un contenido
export interface IContentModel {
  _id: string
  title: string
  photo: string
  description: string
  views: number
  publicationDate: Date
  author: IContentAuthor[]
  category: IContentCategory[]
}
