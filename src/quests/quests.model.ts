import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'quests',
})
export class Quest extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор квеста',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '',
    description: 'Название квеста',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: '',
    description: 'Описание квеста',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '1000',
    description: 'Награда за выполнение квеста (токены)',
  })
  @Column({
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  reward: number;

  @ApiProperty({
    example: 'true',
    description: 'Квест завершен или нет',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isCompleted: boolean;
}
