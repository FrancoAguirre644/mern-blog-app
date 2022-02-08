import mongoose from 'mongoose';
import { IBlog } from '../config/interfaces';

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 50,
        maxlength: 200
    },
    thumbnail: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Types.ObjectId, 
        ref: 'category'
    },
}, {
    timestamps: true
});

export default mongoose.model<IBlog>('blog', blogSchema);