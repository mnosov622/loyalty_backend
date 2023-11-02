import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'roles',
})
export class Role extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор роли',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Администратор',
    description: 'Наименование роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Полный доступ ко всем функциям системы',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;
}
