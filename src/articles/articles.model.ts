import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true 
    }
});

export interface Article extends mongoose.Document {
    // define logic for article
     id: string;
     author: string;
     description: string;
     title: string;

}   