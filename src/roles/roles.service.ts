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

  async getUserRoles(id: number) {
    try {
      const user = await User.findOne({ where: { id } });
      return user.roles;
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

  async assignRoles(userId: number, roles: number[]) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      for (const roleId of roles) {
        const role = await Role.findOne({ where: { id: roleId } });
        if (role && !user.roles.includes(role.name)) {
          user.roles.push(role.name);
          user.changed('roles', true);
        }
      }
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoles(userId: number, roles: number[]) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      for (const roleId of roles) {
        const role = await Role.findOne({ where: { id: roleId } });
        if (role) {
          const index = user.roles.indexOf(role.name);
          if (index > -1) {
            user.roles.splice(index, 1);
            user.changed('roles', true);
          }
        }
      }
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
}
