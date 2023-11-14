import { Task } from '@/tasks/tasks.model';
import { Module } from '@nestjs/common';

@Module({
  imports: [Task],
  controllers: [],
  providers: [],
})
export class UserTaskModule {}
