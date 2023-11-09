import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { SessionsService } from '@/sessions/sessions.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, SessionsService],
})
export class FilesModule {}
