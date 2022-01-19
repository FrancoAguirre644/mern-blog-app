import { Request, Response } from "express";
import { IReqAuth } from "../config/interfaces";
import Blogs from '../models/blogModel';

const blogController = {
    createBlog: async (req: IReqAuth, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: 'Invalid authentication.' });

        try {

            const { title, content, description, thumbnail, category } = req.body;

            const newBlog = new Blogs({
                user: req.user._id,
                title: title.toLowerCase(),
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
    },
    getHomeBlogs: async (req: IReqAuth, res: Response) => {

        try {

            const blogs = await Blogs.aggregate([
                // User
                {
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                            { $project: { password: 0 } }
                        ],
                        as: "user"
                    }
                },
                // array -> object
                { $unwind: "$user" },
                // Category
                {
                    $lookup: {
                        from: "categories",
                        "localField": "category",
                        "foreignField": "_id",
                        "as": "category"
                    }
                },
                // array -> object
                { $unwind: "$category" },
                // Sorting
                { $sort: { "createdAt": -1 } },
                // Group by category
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name" },
                        blogs: { $push: "$$ROOT" },
                        count: { $sum: 1 }
                    }
                },
                // Pagination for blogs
                {
                    $project: {
                        blogs: {
                            $slice: ['$blogs', 0, 4]
                        },
                        count: 1,
                        name: 1
                    }
                }
            ]);

            res.status(200).json(blogs);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getBlog: async (req: Request, res: Response) => {
        try {
            const blog = await Blogs.findOne({ _id: req.params.id }).populate("user", "-password");

            if (!blog) return res.status(400).json({ msg: "Blog does not exist." });

            return res.json(blog);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

export default blogController;