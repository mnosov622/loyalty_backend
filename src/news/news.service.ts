import { Injectable } from '@nestjs/common';
import { News } from './news.model';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  async getNews() {
    const news = await News.findAll();
    return news;
  }

  async createNews(bodyNews: NewsDto) {
    try {
      const news = await News.create({ ...bodyNews });
      return news;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateNews(id: number, bodyNews: NewsDto) {
    try {
      const news = await News.findByPk(id);
      if (!news) throw new Error('No news found');
      await news.update({ ...bodyNews });
      return news;
    } catch (e) {
      throw new Error(e);
    }
  }

  deleteNews(id: number) {
    try {
      News.destroy({ where: { id } });
      return { message: `News with id ${id} has been deleted` };
    } catch (e) {
      throw new Error(e);
    }
  }
}
