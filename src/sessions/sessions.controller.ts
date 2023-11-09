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

@UseGuards(AuthGuardService)
@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async validateUser(@Req() request: Request) {
    console.log('request', request.cookies['token']);
    let token = request.cookies['token'];
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
}
