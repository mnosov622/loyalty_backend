import { SessionsService } from '@/sessions/sessions.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateUserGuardService implements CanActivate {
  constructor(private sessionsService: SessionsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    return this.sessionsService
      .validateToken(token)
      .then((decodedToken) => {
        const userIdFromToken = decodedToken.userId;
        const userIdFromParams = request.params.id;

        if (String(userIdFromToken) !== userIdFromParams) {
          throw new UnauthorizedException(
            'User ID from token does not match user ID from parameters',
          );
        }

        return true;
      })
      .catch(() => false);
  }
}
