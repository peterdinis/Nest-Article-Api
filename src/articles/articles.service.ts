import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './articles.model';

@Injectable()
export class ArticlesService {
  // edit model to constructor
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async createNewArticle(title: string, author: string, description: string) {
    const newArticle = new this.articleModel({
      title,
      description,
      author,
    });

    const result = await newArticle.save();
    return result;
  }

  async loadArticles() {
    const articles = await this.articleModel.find().exec();
    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      author: article.author,
    }));
  }

  async oneArticle(articleId: string) {
    const article = await this.articleModel.findById(articleId);
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      author: article.author,
    };
  }

  async updateArticle(
    articleId: string,
    title: string,
    description: string,
    author: string,
  ) {
    const updateArticle = await this.findArticle(articleId);

    if (title) {
      updateArticle.title = title;
    }

    if (description) {
      updateArticle.description = description;
    }

    if (author) {
      updateArticle.author = author;
    }

    updateArticle.save();
  }

  async deleteArticle(articleId: string) {
    const result = await this.articleModel.deleteOne({ _id: articleId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find article');
    }
  }

  private async findArticle(articleId: string): Promise<Article> {
    let article;

    try {
      article = await (
        await this.articleModel.findById(articleId)
      ).execPopulate();
    } catch (err) {
      throw new NotFoundException('Could not find article');
    }

    if (!article) {
      throw new NotFoundException('Could not find article');
    }

    return article;
  }
}
