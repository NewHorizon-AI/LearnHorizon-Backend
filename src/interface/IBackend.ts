interface PublicationCardUser {
  _id: string
  name: string
  image?: string
}

export interface PublicationCard {
  _id: string
  title: string
  photo: string
  description: string
  views: number
  publicationDate: Date
  author: PublicationCardUser[]
}
