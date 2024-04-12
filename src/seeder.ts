import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { faker } from '@faker-js/faker'

import { User } from 'src/schemas/user.schema'
import { Category } from 'src/schemas/category.schema'
import { Comment } from 'src/schemas/comment.schema'
import { Publication } from 'src/schemas/publication.schema'

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Publication.name) private publicationModel: Model<Publication>
  ) {}

  // Función que retorna un elemento aleatorio de un arreglo
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  async seedDatabase() {
    try {
      await this.seedUsers(10)
      await this.seedCategories(5)
      await this.seedPublications(20)
      await this.seedComments(100)
    } catch (error) {
      console.error('Error seeding database:', error)
    } finally {
      await this.userModel.db.close()
    }
  }

  private async seedUsers(count: number) {
    for (let i = 0; i < count; i++) {
      const newUser = new this.userModel({
        name: faker.string.alpha(10),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        followers: faker.number.int(1000),
        biography: faker.lorem.sentence(),
        editPermissions: faker.datatype.boolean(),
        image: faker.image.avatar()
      })
      await newUser.save()
    }
    console.log(`Inserted ${count} users`)
  }

  private async seedCategories(count: number) {
    for (let i = 0; i < count; i++) {
      const newCategory = new this.categoryModel({
        title: faker.commerce.department(),
        description: faker.commerce.productDescription()
      })
      await newCategory.save()
    }
    console.log(`Inserted ${count} categories`)
  }

  // Función que crea publicaciones de forma aleatoria
  private async seedPublications(count: number) {
    const users = await this.userModel.find()
    const categories = await this.categoryModel.find()

    if (users.length === 0 || categories.length === 0) {
      throw new Error(
        'No se pueden crear publicaciones sin usuarios o categorías'
      )
    }

    for (let i = 0; i < count; i++) {
      const randomUser = this.getRandomElement(users)
      const randomCategory = this.getRandomElement(categories)

      const newPublication = new this.publicationModel({
        title: faker.lorem.sentence(),
        photo: faker.image.url(),
        subtitle: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        markdownContent: faker.lorem.paragraphs(5),
        tags: faker.lorem.words(3).split(' '),
        views: faker.number.int({ max: 1000 }),
        likes: faker.number.int({ max: 1000 }),
        dislikes: faker.number.int({ max: 1000 }),
        author: randomUser._id,
        category: randomCategory._id,
        status: this.getRandomElement(['published', 'review', 'draft'])
      })

      await newPublication.save()
    }
    console.log(`Inserted ${count} publications`)
  }

  // Función que crea comentarios de forma aleatoria
  private async seedComments(count: number) {
    const users = await this.userModel.find()
    const publications = await this.publicationModel.find()

    if (users.length === 0 || publications.length === 0) {
      throw new Error(
        'No se pueden crear comentarios sin usuarios o publicaciones'
      )
    }

    for (let i = 0; i < count; i++) {
      const randomUser = this.getRandomElement(users)
      const randomPublication = this.getRandomElement(publications)

      const newComment = new this.commentModel({
        user: randomUser._id,
        comment: faker.lorem.sentences(),
        likes: faker.number.int({ max: 100 }),
        dislikes: faker.number.int({ max: 100 }),
        commentDate: faker.date.recent(),
        publication: randomPublication._id,
        replies: [], // Se podría complicar agregando respuestas anidadas
        edited: faker.datatype.boolean()
      })

      await newComment.save()
    }
    console.log(`Inserted ${count} comments`)
  }
}
