/*
TODO: 
* assignRoleToUser
* removeRoleFromUser
* getRolesByUserId
* listAllRoles
* createNewRole
* updateRolePermissions
* deleteRole
*/

// // roles.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common'
// import { InjectModel } from '@nestjs/mongoose'
// import { Model } from 'mongoose'
// import { Role } from './schemas/role.schema'
// import { CreateRoleDto } from './dto/create-role.dto'

// @Injectable()
// export class RolesService {
//   constructor(
//     @InjectModel(Role.name) private readonly roleModel: Model<Role>
//   ) {}

//   async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
//     const newRole = new this.roleModel(createRoleDto)
//     return newRole.save()
//   }

//   async findAllRoles(): Promise<Role[]> {
//     return this.roleModel.find().exec()
//   }

//   async findRoleById(id: string): Promise<Role> {
//     const role = await this.roleModel.findById(id).exec()
//     if (!role) {
//       throw new NotFoundException(`Role with ID ${id} not found`)
//     }
//     return role
//   }

//   async updateRole(id: string, updateRoleDto: CreateRoleDto): Promise<Role> {
//     const updatedRole = await this.roleModel
//       .findByIdAndUpdate(id, updateRoleDto, { new: true })
//       .exec()
//     if (!updatedRole) {
//       throw new NotFoundException(`Role with ID ${id} not found`)
//     }
//     return updatedRole
//   }

//   async deleteRole(id: string): Promise<Role> {
//     const deletedRole = await this.roleModel.findByIdAndDelete(id).exec()
//     if (!deletedRole) {
//       throw new NotFoundException(`Role with ID ${id} not found`)
//     }
//     return deletedRole
//   }
// }
