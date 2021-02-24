import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async allArticles() {
    const articles = await this.articlesService.loadArticles();
    return articles;
  }

  @Post()
  async addArticle(
    @Body('title') articleTitle: string,
    @Body('description') articleDescription: string,
    @Body('author') articleAuthor: string,
  ) {
    const newArticle = await this.articlesService.createNewArticle(
      articleAuthor,
      articleDescription,
      articleTitle,
    );
    return newArticle;
  }

  @Get(':id')
  singleArticle(@Param('id') articleId: string) {
    return this.articlesService.oneArticle(articleId);
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') articleId: string,
    @Body('title') articleTitle: string,
    @Body('description') articleDescription: string,
    @Body('author') articleAuthor: string,
  ) {
    await this.articlesService.updateArticle(
      articleId,
      articleTitle,
      articleDescription,
      articleAuthor,
    );
  }

  @Delete(':id')
  async deleteArticle(@Param('id') articleId: string) {
    return this.articlesService.deleteArticle(articleId);
    return null; // kedže mažeme article nechceme nič vrátiť
  }
}
