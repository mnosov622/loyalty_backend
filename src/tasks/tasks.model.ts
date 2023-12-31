import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'tasks',
})
export class Task extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор задачи',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Завершить проект',
    description: 'Название задачи',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Завершить все задачи в срок',
    description: 'Описание задачи',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Дата завершения задачи',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate: Date;
}
