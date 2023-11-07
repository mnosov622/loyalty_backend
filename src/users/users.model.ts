import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Петров',
    description: 'Фамилия пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: 'ivan_petrov',
    description: 'Уникальное имя пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'ivan@example.com',
    description: 'Адрес электронной почты',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'my_password_hash',
    description: 'Хэш пароля',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'URL профильной картинки пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  profilePicture: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'Дата рождения пользователя',
  })
  @Column({
    type: DataType.DATE,
  })
  dateOfBirth: Date;

  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  phoneNumber: string;

  @ApiProperty({
    example: 250,
    description: 'Количество токенов',
  })
  @Column({
    type: DataType.INTEGER,
  })
  tokenAmount: number;

  @ApiProperty({
    example: '0x3Dd03d7d6c3137f1Eb7582BaFfE949b1E3B4E9A7',
    description: 'Wallet address',
  })
  @Column({
    type: DataType.STRING,
  })
  wallet_address: string;

  @ApiProperty({
    example: ['admin', 'user'],
    description: 'User roles',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  roles: string[];
}
