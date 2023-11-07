import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'files',
})
export class Files extends Model {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the file',
  })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty({
    example: '/path/to/image.jpg',
    description: 'The path of the image',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string;
}
