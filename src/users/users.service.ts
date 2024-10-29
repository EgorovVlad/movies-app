import { Injectable } from '@nestjs/common';
import type { IUser } from './users.model';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      email: 'john.doe@gmail.com',
      password: 'password',
    },
  ];

  async findOne(email: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
