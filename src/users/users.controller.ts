import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';

@UseGuards(AuthGuardService)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    console.log('here');
    return this.usersService.getUserById(id);
  }

  @Post(':id')
  updateUser(@Param('id') id: number, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }
}
