import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(userData: User) {
    if (!userData) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No data provided',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newUser = await this.userModel.create({ ...userData });
      return { status: HttpStatus.CREATED, data: newUser };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create user:' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
