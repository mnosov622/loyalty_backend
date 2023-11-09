import { FilesModule } from '@/files/files.module';
import { FilesService } from '@/files/files.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [FilesModule],
})
export class NewsModule {}
