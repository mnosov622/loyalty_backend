import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [AuthModule, UsersModule],
})
export class AuthModule {}
