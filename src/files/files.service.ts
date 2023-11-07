import { Injectable } from '@nestjs/common';
import { Files } from './files.model';

@Injectable()
export class FilesService {
  async createFile(path) {
    try {
      const file = await Files.create({ path });
      return file;
    } catch (error) {
      throw error;
    }
  }
}
