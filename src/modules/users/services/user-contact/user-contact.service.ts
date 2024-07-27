import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Importar los DTOs necesarios
import { CreateUserContactDto } from '../../dtos/user/user-contact/create-user-contact.dto'
import { UpdateUserContactDto } from '../../dtos/user/user-contact/update-user-contact.dto'

// Importar el esquema necesario
import { UserContact } from '../../schemas/user-contact.schema'

@Injectable()
export class UserContactService {
  constructor(
    @InjectModel(UserContact.name)
    private userContactModel: Model<UserContact>
  ) {}

  async findAllContacts(): Promise<UserContact[]> {
    return this.userContactModel.find().exec()
  }

  async findContactByUserId(userId: string): Promise<UserContact> {
    const contact = await this.userContactModel
      .findOne({ user_id: userId })
      .exec()
    if (!contact) {
      throw new NotFoundException('Contact not found')
    }
    return contact
  }

  async createContact(
    userId: string,
    createUserContactDto: CreateUserContactDto
  ): Promise<UserContact> {
    const newContact = new this.userContactModel({
      ...createUserContactDto,
      user_id: userId
    })
    return newContact.save()
  }

  async updateContact(
    userId: string,
    updateContactDto: UpdateUserContactDto
  ): Promise<UserContact> {
    const updatedContact = await this.userContactModel
      .findOneAndUpdate({ user_id: userId }, updateContactDto, { new: true })
      .exec()
    if (!updatedContact) {
      throw new NotFoundException('Contact not found')
    }
    return updatedContact
  }

  async deleteContact(userId: string): Promise<UserContact> {
    const deletedContact = await this.userContactModel
      .findOneAndDelete({ user_id: userId })
      .exec()
    if (!deletedContact) {
      throw new NotFoundException('Contact not found')
    }
    return deletedContact
  }
}
