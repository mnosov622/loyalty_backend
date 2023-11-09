import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.usersService.createUser(signupDto as User);
  }

  @Post('/login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
    rememberMe?: boolean,
  ) {
    return this.usersService.login(loginDto as User, response, rememberMe);
  }
}
