export const PostDataDocs = {
  article_id: {
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  },
  photo: {
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg'
  },
  description: {
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.'
  },
  views: {
    description: 'Número de vistas del artículo',
    example: 100,
    default: 0
  },
  likes: {
    description: 'Número de likes del artículo',
    example: 50,
    default: 0
  },
  dislikes: {
    description: 'Número de dislikes del artículo',
    example: 5,
    default: 0
  }
}
