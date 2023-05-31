import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>
  abstract findAll(page: string, limit: string): Promise<User[]>
  abstract findOne(id: string): Promise<User | undefined>
  abstract update(id: string, data: UpdateUserDto): Promise<User>
  abstract remove(id: string): Promise<void>
  abstract findEmail(email: string): Promise<User | undefined>
  abstract findUsername(username: string): Promise<User | undefined>
}