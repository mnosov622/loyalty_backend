import { Task } from '@/tasks/tasks.model';
import { User } from '@/users/users.model';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'userTask',
})
export class UserTask extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Task)
  @Column
  taskId: number;
}
