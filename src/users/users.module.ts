import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { SessionsModule } from '@/sessions/sessions.module';
import { SessionsService } from '@/sessions/sessions.service';

@Module({
  imports: [UsersModule, SessionsModule, SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SessionsService],
  exports: [UsersService],
})
export class UsersModule {}
