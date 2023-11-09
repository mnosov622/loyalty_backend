import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'sessions',
})
export class Sessions extends Model {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'token_example',
    description: 'Session token',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  token: string;
}
