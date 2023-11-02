import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'auth',
})
export class Auth extends Model<Auth> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор сессии аутентификации',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user123_session',
    description: 'Идентификатор сессии',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  sessionId: string;

  @ApiProperty({
    example: '2023-12-31 23:59:59',
    description: 'Дата и время истечения сессии',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationDate: Date;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя, связанный с сессией',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
