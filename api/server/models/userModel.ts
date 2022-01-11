import mongoose from 'mongoose';
import { IUser } from '../config/interfaces';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxlength: [20, "Your name is up 20 chars long."]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone."],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password."],
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {
        type: String,
        default: 'user'
    },
    type: {
        type: String,
        default: 'normal'
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);