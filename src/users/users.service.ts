import { Injectable } from '@nestjs/common';
export type User = { userId: number; username: string; password: string };
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: hashSync('changeme', 10),
      },
      {
        userId: 2,
        username: 'chris',
        password: hashSync('secret', 10),
      },
      {
        userId: 3,
        username: 'maria',
        password: hashSync('guess', 10),
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
