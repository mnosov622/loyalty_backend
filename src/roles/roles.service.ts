import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  async getUserRole(userId: number) {
    try {
      const user = await Role.findOne({ where: { userId } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
