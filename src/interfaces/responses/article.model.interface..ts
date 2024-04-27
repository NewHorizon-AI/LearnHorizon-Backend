// Interfaz para la respuesta visualizar articulo de un modelo

// Interfaz para la respuesta visualizar articulo de un modelo
export interface IArticleAuthor {
  image?: string
  name: string
  followers: number
}
// Interfaz para la respuesta visualizar articulo de un modelo
export interface IArticleComment {
  user: IArticleAuthor
  comment: string
  likes: number
  dislikes: number
  commentDate: Date
  replies: IArticleComment[]
  edited: boolean
}

// Interfaz para la respuesta visualizar articulo de un modelo
export interface IArticleCategories {
  title: string
  publicationCount: number
}

// Interfaz para la respuesta visualizar articulo de un modelo
export interface IArticlePublication {
  title: string
  photo: string
  subtitle: string
  description: string
  markdownContent: string
  tags: string[]
  publicationDate: Date
  views: number
  likes: number
  dislikes: number
  author: IArticleAuthor[]
  category: IArticleCategories[]
  comments: IArticleComment[]
}
