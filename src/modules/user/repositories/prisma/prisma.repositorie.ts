import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repositorie";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      ...data
    });
    const newUser = await this.prisma.user.create({
      data: { ...user }
    });

    return plainToInstance(User, newUser);
  }
  
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id }
    });
    return plainToInstance(User, user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...data
      }
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }

  async findEmail(email: string): Promise<User> {
    const userEmail = await this.prisma.user.findUnique({
      where: {email}
    });
    return plainToInstance(User, userEmail);
  }

  async findUsername(username: string): Promise<User> {
    const userUsername = await this.prisma.user.findUnique({
      where: {username}
    });
    return plainToInstance(User, userUsername); 
  }
}