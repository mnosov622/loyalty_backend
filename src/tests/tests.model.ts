import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'tests',
})
export class Test extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор теста',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Тест о компании',
    description: 'Название теста',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Тест содержит вопросы о компании ии ее достижениях.',
    description: 'Описание теста',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: 15,
    description: 'Длительность теста в минутах',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationMinutes: number;
}
