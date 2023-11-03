import { LoginDto, SignupDto } from '@/users/dto/users.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.usersService.createUser(signupDto as User);
  }

  // @Post('/login')
  // login(@Body() loginDto: LoginDto) {
  //   return this.usersService.login(loginDto);
  // }
}
