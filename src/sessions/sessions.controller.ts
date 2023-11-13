import {
  Controller,
  Headers,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Request } from 'express';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @UseGuards(AuthGuardService)
  @Post('validate')
  async validateUser(@Req() request: Request) {
    console.log('request', request.cookies['token']);
    const token = request.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      await this.sessionsService.validateToken(token);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }

    return 'Token is valid';
  }

  @Post('logout')
  async logout(@Req() request: Request, @Res() response) {
    const token = request.headers.authorization?.split(' ')[1];
    console.log('token', token);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      await this.sessionsService.deleteSession(token);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }

    response.clearCookie('token');
    return 'Logged out successfully';
  }
}
