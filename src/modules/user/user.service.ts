import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repositorie";

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll(page: string, limit: string) {
    return await this.usersRepository.findAll(page, limit);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersRepository.update(id, updateUserDto);

    return updateUser;
  }

  async remove(id: string) {
    return this.usersRepository.remove(id);
  }

  async findEmail(email: string) {
    const user = await this.usersRepository.findEmail(email);

    return user;
  }
}
