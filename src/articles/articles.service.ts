import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './articles.model';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  createNewArticle(author: string, description: string, title: string) {
    const prodId = Math.random().toString();
    const newArticle = new Article(prodId, title, description, author);
    this.articles.push(newArticle); // nový článok pridáme do poľa

    return newArticle;
  }

  loadArticles() {
    // return new array with our all articles
    return [...this.articles];
  }

  oneArticle(articleId: string) {
    const article = this.articles.find((article) => article.id === articleId);
    if (!article) {
      // sending 404 response
      throw new NotFoundException('Could not find article');
    }

    return {
      ...article,
    };
  }

  updateArticle(
    articleId: string,
    description: string,
    author: string,
    title: string,
  ) {
    const [article, index] = this.findArticle(articleId);

    const updatedArticle = {...article};

    if(author) {
      updatedArticle.author = author;

    }

    if(description) {
      updatedArticle.description = description;
    }

    if(title) {
      updatedArticle.title = title;
    }

    this.articles[index] = updatedProduct;
  }

  private findArticle(articleId: string) {
    const articleIndex = this.articles.findIndex(art =>art.id === articleId);
    const article = this.articles[articleIndex];

    if(!article) {
      throw new NotFoundException('Could not find article.');
    }

    return [article, articleIndex];
  }


  deleteProduct(articleId: string) {
    const index = this.findArticle(articleId)[1];
    this.articles.splice(index, 1); // zmaže 
  }
}