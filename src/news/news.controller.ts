import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';
import { News } from './news.model';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNews() {
    return this.newsService.getNews();
  }

  @Post()
  createNews(@Body() news: NewsDto) {
    return this.newsService.createNews(news);
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
