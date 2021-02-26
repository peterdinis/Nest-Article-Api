import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {Response} from 'express';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async allArticles(@Res() response: Response) {
    const articles = await this.articlesService.loadArticles();
    return response.json({
      message: 'All articles from db',
      articles
    })
  }

  @Post()
  async addArticle(
    @Body('title') articleTitle: string,
    @Body('description') articleDescription: string,
    @Body('author') articleAuthor: string,
    @Res() response: Response
  ) {
    const newArticle = await this.articlesService.createNewArticle(
      articleAuthor,
      articleDescription,
      articleTitle,
    );
    return response.json({
      message: 'New Article was edit',
      newArticle
    })
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
  }
}
