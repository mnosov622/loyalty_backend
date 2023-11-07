import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':id')
  getUserRole(@Param('id') id: number) {
    return this.rolesService.getUserRole(id);
  }

  @Post()
  createRole(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return this.rolesService.createRole(name, description);
  }

  @Post('/assign/:id')
  assignRole(@Param('id') userId: number, @Body('roles') roles: number[]) {
    return this.rolesService.assignRole(userId, roles);
  }
}
