import {
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repositorie";

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    const findEmail = await this.usersRepository.findEmail(createUserDto.email);
    const findUsername = await this.usersRepository.findUsername(
      createUserDto.username,
    );

    if (findEmail) {
      throw new ConflictException("Email já existe");
    }

    if (findUsername) {
      throw new ConflictException("Username já existe");
    }

    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const findEmail = await this.usersRepository.findEmail(
        updateUserDto.email,
      );

      if (findEmail) {
        throw new ConflictException("Email já existe");
      }
    }

    if (updateUserDto.username) {
      const findUsername = await this.usersRepository.findUsername(
        updateUserDto.username,
      );

      if (findUsername) {
        throw new ConflictException("Username já existe");
      }
    }

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
