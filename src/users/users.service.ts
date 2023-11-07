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

  async login(loginData: User) {
    const { email, wallet_address, username, password } = loginData;

    if (wallet_address || email || username) {
      const searchParams = ['walletAddress', 'email', 'username'].reduce(
        (params, field) => {
          if (loginData[field]) {
            params[field] = loginData[field];
          }
          return params;
        },
        {},
      );

      try {
        const user = await this.userModel.findOne({
          where: searchParams,
        });

        //TODO: compare hashed password with password provided
        //   const isPasswordMatching = await bcrypt.compare(password, user.password);
        // if (!isPasswordMatching) {
        //   throw new HttpException('Wrong credentials provided.', HttpStatus.BAD_REQUEST);
        // }

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        if (password !== user.password) {
          throw new HttpException(
            'Wrong credentials provided.',
            HttpStatus.BAD_REQUEST,
          );
        }

        return user;
      } catch (e) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Failed to login:' + e.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No login data provided',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUsers() {
    try {
      const users = await this.userModel.findAll({
        attributes: { exclude: ['password'] },
      });
      return users;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get users:' + e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await this.userModel.findOne({
        where: { username: username },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get user:' + e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({
        where: { email: email },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get user:' + e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByWalletAddress(walletAddress: string) {
    try {
      const user = await this.userModel.findOne({
        where: { wallet_address: walletAddress },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get user:' + e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userModel.findOne({
        where: { id: Number(id) },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get user:' + e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
