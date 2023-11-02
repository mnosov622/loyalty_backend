import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { NewsService } from './news/news.service';
import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, AuthModule, ItemsModule, TasksModule, NewsModule, RolesModule],
  controllers: [AppController, AuthController, ItemsController, TasksController, NewsController, RolesController],
  providers: [AppService, ItemsService, TasksService, NewsService, RolesService],
})
export class AppModule {}
