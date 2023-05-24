import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validatedUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findEmail(userEmail);

    if (user) {
      const passwordMatch = await compare(userPassword, user.password);

      if (passwordMatch) {
        return { email: user.email };
      }

      return null;
    }
  }

  async login(email: string) {
    const user = await this.userService.findEmail(email);

    return {
      token: this.jwtService.sign({ email }, { subject: user.id }),
    };
  }
}
