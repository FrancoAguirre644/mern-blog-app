import { Response } from "express";
import { IReqAuth } from "../config/interfaces";
import Comments from "../models/commentModel";

const commentController = {
    createComment: async (req: IReqAuth, res: Response) => {
        
        if (!req.user) return res.status(400).json({ msg: 'Invalid Authorization.' })

        try {

            const { content, blog_id, blog_user_id } = req.body;

            const newComment = new Comments({
                user: req.user._id,
                content,
                blog_id,
                blog_user_id
            });

            await newComment.save();

            return res.status(200).json(newComment);

        } catch (err: any) {
            res.status(500).json({ msg: err.message });
        }

    }
}

export default commentController;