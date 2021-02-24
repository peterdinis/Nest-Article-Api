import { Controller, Get, Post} from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
    // add articles
    @Post()
    addArticle(): any {
        // store article
    }
}