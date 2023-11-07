import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getUserRole(@Param('userId') userId: number) {
    return this.rolesService.getUserRole(userId);
  }
}
