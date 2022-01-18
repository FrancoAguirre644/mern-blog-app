import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },
    name: {
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
        minLength: 2000,
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

export default mongoose.model('blog', blogSchema);