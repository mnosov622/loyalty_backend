import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { User } from '@/users/users.model';

@Injectable()
export class RolesService {
  async getAllRoles() {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getUserRole(id: number) {
    try {
      const user = await Role.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async assignRole(userId: number, roles: number[]) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      for (const roleId of roles) {
        const role = await Role.findOne({ where: { id: roleId } });
        if (role) {
          user.roles.push(role.name);
        }
      }
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createRole(name: string, description: string) {
    try {
      const role = await Role.create({ name, description });
      return role;
    } catch (error) {
      throw error;
    }
  }
}
