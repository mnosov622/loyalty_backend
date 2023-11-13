import { Task } from '@/tasks/tasks.model';
import { User } from '@/users/users.model';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'userTask',
})
export class UserTask extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @Column(DataType.DATE)
  startDate: Date;

  @Column(DataType.DATE)
  endDate: Date;

  @Column(DataType.STRING)
  status: string;

  @ForeignKey(() => User)
  @Column
  authorId: number;
}
