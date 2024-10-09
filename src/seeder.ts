// import { Injectable } from '@nestjs/common'
// import { faker } from '@faker-js/faker'
// import axios from 'axios'

// @Injectable()
// export class SeederService {
//   private readonly API_URL = 'http://localhost:3001'

//   // Función que retorna un número especificado de elementos aleatorios únicos de un arreglo
//   private getRandomUniqueElements<T>(array: T[], numElements: number): T[] {
//     const shuffled = [...array].sort(() => 0.5 - Math.random())
//     return shuffled.slice(0, numElements)
//   }

//   private getRandomElement<T>(array: T[]): T {
//     return array[Math.floor(Math.random() * array.length)]
//   }

//   async seedDatabase() {
//     try {
//       await this.seedUsers(10)
//       await this.seedCategories(5)
//       const categories = await axios.get(`${this.API_URL}/categories`)
//       const users = await axios.get(`${this.API_URL}/users`)
//       await this.seedPublications(20, categories.data, users.data)
//       const publications = await axios.get(`${this.API_URL}/publications`)
//       await this.seedComments(100, users.data, publications.data)
//     } catch (error) {
//       console.error('Error seeding database:', error)
//     }
//   }

//   // Funciones para insertar datos en la base de datos
//   private async seedUsers(count: number) {
//     for (let i = 0; i < count; i++) {
//       const user = {
//         name: faker.string.alpha(10),
//         username: faker.internet.userName(),
//         password: faker.internet.password(),
//         email: faker.internet.email(),
//         followers: faker.number.int(1000),
//         biography: faker.lorem.sentence(),
//         editPermissions: faker.datatype.boolean(),
//         image: faker.image.avatar()
//       }
//       await axios.post(`${this.API_URL}/users`, user)
//     }
//     console.log(`Inserted ${count} users`)
//   }

//   // Función para insertar categorías
//   private async seedCategories(count: number) {
//     for (let i = 0; i < count; i++) {
//       const category = {
//         title: faker.commerce.department(),
//         description: faker.commerce.productDescription()
//       }
//       await axios.post(`${this.API_URL}/categories`, category)
//     }
//     console.log(`Inserted ${count} categories`)
//   }

//   private async seedPublications(
//     count: number,
//     categories: any[],
//     users: any[]
//   ) {
//     if (users.length === 0 || categories.length === 0) {
//       throw new Error(
//         'No se pueden crear publicaciones sin usuarios o categorías'
//       )
//     }

//     for (let i = 0; i < count; i++) {
//       const numAuthors = faker.number.int({ min: 1, max: 3 })
//       const numCategories = faker.number.int({ min: 1, max: 3 })

//       // Obtiene varios usuarios y categorías aleatorios sin repetir
//       const randomUsers = this.getRandomUniqueElements(users, numAuthors)
//       const randomCategories = this.getRandomUniqueElements(
//         categories,
//         numCategories
//       )

//       const publication = {
//         title: faker.lorem.sentence(),
//         photo: faker.image.url(),
//         subtitle: faker.lorem.sentence(),
//         description: faker.lorem.paragraph(),
//         markdownContent: faker.lorem.paragraphs(5),
//         tags: faker.lorem.words(3).split(' '),
//         views: faker.number.int({ max: 1000 }),
//         likes: faker.number.int({ max: 1000 }),
//         dislikes: faker.number.int({ max: 1000 }),
//         author: randomUsers.map((user) => user._id), // Ahora es un array de IDs de usuario únicos
//         category: randomCategories.map((category) => category._id), // Ahora es un array de IDs de categoría únicos
//         status: this.getRandomElement(['published', 'review', 'draft'])
//       }

//       try {
//         await axios.post(`${this.API_URL}/publications`, publication)
//         console.log(`Inserted publication: ${i + 1}`)
//       } catch (error) {
//         console.error(
//           `Error inserting publication ${i + 1}:`,
//           error.response ? error.response.data : error
//         )
//       }
//     }
//   }

//   private async seedComments(count: number, users: any[], publications: any[]) {
//     for (let i = 0; i < count; i++) {
//       const randomUser = this.getRandomElement(users)
//       const randomPublication = this.getRandomElement(publications)
//       const comment = {
//         user: randomUser._id,
//         comment: faker.lorem.sentences(),
//         likes: faker.number.int({ max: 100 }),
//         dislikes: faker.number.int({ max: 100 }),
//         commentDate: new Date().toISOString(), // Fecha en formato ISO
//         publication: randomPublication._id,
//         edited: faker.datatype.boolean()
//       }
//       try {
//         await axios.post(`${this.API_URL}/comments`, comment)
//         console.log(`Inserted comment: ${i + 1}`)
//       } catch (error) {
//         console.error(
//           `Error inserting comment ${i + 1}:`,
//           error.response ? error.response.data : error
//         )
//       }
//     }
//     console.log(`Inserted ${count} comments`)
//   }
// }
