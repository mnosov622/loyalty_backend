import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  signup(@Body('userData') userData: User) {
    return this.usersService.createUser(userData);
  }
}
