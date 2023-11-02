import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'analytics',
})
export class Analytics extends Model<Analytics> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор аналитики',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'earnings',
    description: 'Вид аналитики (заработок, расходы, участие и т. д.)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  action: string;

  @ApiProperty({
    example: 250,
    description: 'Значение аналитики (сумма заработка, расходов и др.)',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  value: number;

  @ApiProperty({
    example: 'week',
    description: 'Период аналитики (неделя, месяц, квартал и др.)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  period: string;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор сотрудника',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employeeId: number;
}
