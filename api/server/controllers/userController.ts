import { Request, Response } from "express";
import Users from '../models/userModel';

const userController = {
    getUser: async (req: Request, res: Response) => {
        try {
            const user = await Users.findById(req.params.id).select("-password");

            res.status(200).json(user);
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

export default userController;