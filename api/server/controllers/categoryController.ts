import { Request, Response } from "express";
import { IReqAuth } from "../config/interfaces";
import Categories from '../models/categoryModel';

const categoryController = {
    createCategory: async (req: IReqAuth, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: "Invalid authorization" });

        if (req.user.role !== 'admin') return res.status(400).json({ msg: "Invalid authorization" });

        try {

            const name = req.body.name.toLowerCase();

            const newCategory = new Categories({ name });
            await newCategory.save();

            res.status(200).json({ newCategory });

        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.values(err.keyValue)[0] + " already exists."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            }

            return res.status(500).json({ msg: errMsg })
        }
    },
    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Categories.find().sort("-createdAt");

            res.status(200).json({ categories });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req: IReqAuth, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: "Invalid authorization" });

        if (req.user.role !== 'admin') return res.status(400).json({ msg: "Invalid authorization" });

        try {

            const category = await Categories.findOneAndUpdate({
                _id: req.params.id
            }, {
                name: req.body.name
            });

            res.status(200).json({ msg: 'Updated Success!' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req: IReqAuth, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: "Invalid authorization" });

        if (req.user.role !== 'admin') return res.status(400).json({ msg: "Invalid authorization" });

        try {

            await Categories.findByIdAndDelete(req.params.id);

            res.status(200).json({ msg: 'Deleted  Success!' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

export default categoryController;