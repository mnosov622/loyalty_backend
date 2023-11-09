import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SessionsService } from '@/sessions/sessions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private sessionsService: SessionsService,
  ) {}

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

    const existingUser = await this.userModel.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = await this.userModel.create({
        ...userData,
        password: hashedPassword,
      });
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

  async login(loginData: User, rememberMe?: boolean) {
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

      const user = await this.userModel.findOne({
        where: searchParams,
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const userWithoutPassword = user.toJSON();
      delete userWithoutPassword.password;

      const jwtPayload = {
        userId: userWithoutPassword.id,
        roles: user.roles,
        email: user.email,
        username: user.username,
        wallet_address: user?.wallet_address,
      };

      const secretKey = process.env.JWT_SECRET_KEY;
      const expiresIn = rememberMe ? '7d' : '24h';
      const token = jwt.sign(jwtPayload, secretKey, { expiresIn });

      // TODO: save token and payload to sessions
      // sessions table (id, token)
      // if token is invalid (check expiry date), delete it and redirect user to login
      // @decorator jwt guard (can activate) on each endpoint except login, logout
      //

      this.sessionsService.createSession(token);

      return { statusCode: HttpStatus.OK, data: userWithoutPassword, token };
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

  async updateUser(id: number, user: User) {
    try {
      const updatedUser = await this.userModel.findByPk(id);
      await updatedUser.update({ ...user });
      return updatedUser;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to update user:' + e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
