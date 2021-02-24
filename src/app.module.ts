import { Module } from '@nestjs/common';
import {ArticlesModule} from './articles/articles.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [ArticlesModule, MongooseModule.forRoot('mongodb+srv://peter:PETERdinis1234@cluster0.m2n4e.mongodb.net/ArticlesDatabse?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],
})
export class AppModule {}
