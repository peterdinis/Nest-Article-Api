import { Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import {ArticlesService} from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}
    // add articles
    @Post()
    addArticle(@Body('author') articleAuthor: string, @Body('description') articleDescription: string, @Body('title') articleTitle: string): any {
        // store article
        return this.articlesService.createNewArticle(articleAuthor, articleDescription, articleTitle);
    }

    @Get()
    allArticles() {
        return this.articlesService.loadArticles();
    }

    @Get(":id")
    singleArticle(@Param('id') articleId: string) {
        return this.articlesService.oneArticle(articleId);
    }

    @Patch(":id")
    updateArticle(@Param('id') articleId: string, @Body('author') articleAuthor: string, @Body('description') articleDescription: string, @Body('title') articleTitle: string) {
        return this.articlesService.updateArticle(articleId)
    }

    @Delete(:id)

    deleteArticle(@Param('id') articleId: string) {
        return this.articlesService.deleteArticle();
    }
}