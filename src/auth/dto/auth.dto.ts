import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  walletAddress?: string;
  email?: string;
  username?: string;
}

export class SignupDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  walletAddress?: string;
}
