import { Response } from "express";
import { IReqAuth } from "../config/interfaces";
import Blogs from '../models/blogModel';

const blogController = {
    createBlog: async (req: IReqAuth, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: 'Invalid authentication.' });

        try {

            const { title, content, description, thumbnail, category } = req.body;

            const newBlog = new Blogs({
                user: req.user._id,
                title,
                content,
                description,
                thumbnail,
                category
            });

            await newBlog.save();

            res.status(200).json({ newBlog });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

export default blogController;