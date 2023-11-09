import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuardService)
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNews() {
    return this.newsService.getNews();
  }

  @Get(':id')
  getNewsById(@Param('id') id: number) {
    return this.newsService.getNewsById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createNews(@UploadedFile() image, @Body() news: NewsDto) {
    return this.newsService.createNews({ ...news, image });
  }

  @Post(':id')
  updateNews(@Param('id') id: number, @Body() news: NewsDto) {
    return this.newsService.updateNews(id, news);
  }

  @Delete(':id')
  deleteNews(@Param('id') id: number) {
    return this.newsService.deleteNews(id);
  }
}
