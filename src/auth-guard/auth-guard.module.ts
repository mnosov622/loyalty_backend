import { SessionsModule } from '@/sessions/sessions.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SessionsModule],
  controllers: [],
})
export class AuthGuardModule {}
