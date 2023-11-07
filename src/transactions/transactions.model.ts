import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'transactions',
})
export class Transaction extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор транзакции',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Получение токенов',
    description: 'Тип транзакции',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transactionType: string;

  @ApiProperty({
    example: '0x1a2b3c4d5e6f',
    description: 'Отправитель (адрес кошелька)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sender: string;

  @ApiProperty({
    example: '0x7e8f9a0b1c2d',
    description: 'Получатель (адрес кошелька)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  recipient: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transactionDescription: string;

  @ApiProperty({
    example: 100.0,
    description: 'Количество токенов',
  })
  @Column({
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  tokenAmount: number;

  @ApiProperty({
    example: '2023-12-31 15:30:00',
    description: 'Дата и время транзакции',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  transactionTimestamp: Date;
}
