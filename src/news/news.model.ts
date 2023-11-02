import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'news',
})
export class News extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор новости',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Важное событие',
    description: 'Заголовок новости',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Краткое описание важного события',
    description: 'Краткое описание новости',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Дата публикации новости',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  publicationDate: Date;

  @ApiProperty({
    example: 'https://example.com/news-image.jpg',
    description: 'URL изображения новости',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl: string;
}
