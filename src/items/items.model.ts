import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'items',
})
export class Item extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор товара',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Кружка',
    description: 'Название товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Кружка с надписью',
    description: 'Описание товара',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: 100.99,
    description: 'Цена товара',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Количество товара в наличии',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @ApiProperty({
    example: 'https://example.com/item.jpg',
    description: 'URL изображения товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl: string;
}
