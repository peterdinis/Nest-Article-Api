import { Module } from '@nestjs/common';
import {ArticlesService} from './articles.service';
import {ArticlesController} from './articles.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { ArticleSchema } from './articles.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Article',
    schema: ArticleSchema,
  }])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
