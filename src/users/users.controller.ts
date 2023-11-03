import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
