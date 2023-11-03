import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/users.dto';

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

  // async login(loginDto: LoginDto) {
  //   const { walletAddress, email, username } = loginDto;

  //   if (!walletAddress && !email && !username) {
  //     throw new HttpException(
  //       'Please provide a wallet address, email, or username.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const user =
  //     await this.userService.findUserByWalletAddressOrEmailOrUsername(
  //       walletAddress,
  //       email,
  //       username,
  //     );

  //   if (!user) {
  //     throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  //   }

  //   return user;
  // }
}
