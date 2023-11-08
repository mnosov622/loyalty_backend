import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.usersService.createUser(signupDto as User);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto, rememberMe?: boolean) {
    return this.usersService.login(loginDto as User, rememberMe);
  }
}
