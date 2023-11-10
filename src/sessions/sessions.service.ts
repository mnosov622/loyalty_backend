import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Sessions } from './sessions.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SessionsService {
  async createSession(token: string) {
    try {
      const newSession = await Sessions.create({ token });
      return { status: 201, data: newSession };
    } catch (e) {
      throw new Error(e);
    }
  }

  async validateToken(token: string) {
    const session = await Sessions.findOne({ where: { token } });
    console.log('session', session);
    if (!session) {
      throw new UnauthorizedException('Token not found');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    if (decoded.exp < Date.now() / 1000) {
      await session.destroy();
      throw new UnauthorizedException('Token expired');
    }

    return decoded;
  }

  async deleteSession(token: string) {
    try {
      const result = await Sessions.destroy({ where: { token } });
      if (result === 0) throw new Error('No session found');
      return { message: `Session with token ${token} has been deleted` };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
