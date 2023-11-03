import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/users/users.module';
import { AuthController } from '@/auth/auth.controller';
import { AuthModule } from '@/auth/auth.module';
import { ItemsController } from '@/items/items.controller';
import { ItemsService } from '@/items/items.service';
import { ItemsModule } from '@/items/items.module';
import { TasksService } from '@/tasks/tasks.service';
import { TasksController } from '@/tasks/tasks.controller';
import { TasksModule } from '@/tasks/tasks.module';
import { NewsService } from '@/news/news.service';
import { NewsController } from '@/news/news.controller';
import { NewsModule } from '@/news/news.module';
import { RolesService } from '@/roles/roles.service';
import { RolesController } from '@/roles/roles.controller';
import { RolesModule } from '@/roles/roles.module';
import { TransactionsModule } from '@/transactions/transactions.module';
import { QuestsService } from '@/quests/quests.service';
import { QuestsController } from '@/quests/quests.controller';
import { QuestsModule } from '@/quests/quests.module';
import { TestsService } from '@/tests/tests.service';
import { TestsController } from '@/tests/tests.controller';
import { TestsModule } from '@/tests/tests.module';
import { AnalyticsController } from '@/analytics/analytics.controller';
import { AnalyticsModule } from '@/analytics/analytics.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@/users/users.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true,
      sync: { force: true },
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
    TasksModule,
    NewsModule,
    RolesModule,
    TransactionsModule,
    QuestsModule,
    TestsModule,
    AnalyticsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    ItemsController,
    TasksController,
    NewsController,
    RolesController,
    QuestsController,
    TestsController,
    AnalyticsController,
  ],
  providers: [
    AppService,
    ItemsService,
    TasksService,
    NewsService,
    RolesService,
    QuestsService,
    TestsService,
  ],
})
export class AppModule {}
