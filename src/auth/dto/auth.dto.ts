import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The wallet address of the user',
    example: '0xabc...',
  })
  walletAddress?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email?: string;

  @ApiProperty({ description: 'The username of the user', example: 'user123' })
  username?: string;
}

export class SignupDto {
  @ApiProperty({ description: 'The username of the user', example: 'user123' })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    description: 'The wallet address of the user',
    example: '0xabc...',
  })
  walletAddress?: string;
}
