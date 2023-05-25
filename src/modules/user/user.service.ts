import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repositorie";
import { JwtStrategy } from "../auth/jwt.strategy";

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

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

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

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
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return this.usersRepository.remove(id);
  }

  async findEmail(email: string) {
    const user = await this.usersRepository.findEmail(email);

    return user;
  }

  async teste(authorization){
    const token = authorization.split(" ")[1];
    return token;
  }
}
