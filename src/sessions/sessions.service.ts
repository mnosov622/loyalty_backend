import { Injectable } from '@nestjs/common';
import { Sessions } from './sessions.model';

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
}
