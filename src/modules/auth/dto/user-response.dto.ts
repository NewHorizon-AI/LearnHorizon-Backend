import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({
    description: 'El ID único del usuario',
    example: '123',
    type: String
  })
  _id: string

  @ApiProperty({
    description: 'Nombre único de usuario',
    example: 'john_doe'
  })
  username: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com'
  })
  email: string

  constructor(user: any) {
    this._id = user._id
    this.username = user.username
    this.email = user.email
  }
}
