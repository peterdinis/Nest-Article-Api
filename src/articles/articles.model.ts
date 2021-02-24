export class Article {
    // define logic for article

    id: string
    author: string
    description: string
    title: string


    constructor(id: string, author: string, description: string, title: string) {
        this.id = id;
        this.author = author;
        this.description = description;
        this.title = title;
    }
}   