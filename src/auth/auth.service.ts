import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '_/users/users.service';
import type { IUser } from '_/users/users.model';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    };
  }
}
