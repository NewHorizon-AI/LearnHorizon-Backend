export class ArticleDataDocs {
  static article_id = {
    description: 'ID del artículo',
    example: '60d2f77bcf86cd799439012'
  }

  static photo = {
    description: 'URL de la foto del artículo',
    example: 'https://example.com/photo.jpg'
  }

  static description = {
    description: 'Descripción del artículo',
    example: 'Este es un artículo sobre NestJS y MongoDB.'
  }

  static views = {
    description: 'Número de vistas del artículo',
    example: 100
  }

  static likes = {
    description: 'Número de likes del artículo',
    example: 50
  }

  static dislikes = {
    description: 'Número de dislikes del artículo',
    example: 5
  }

  // static tags ={
  //   description: 'Etiquetas asociadas al artículo',
  //   example: ['60d2f77bcf86cd799439013', '60d2f77bcf86cd799439014'],
  // };
}
