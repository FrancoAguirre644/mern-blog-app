import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../config/generateToken';

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body;

            const user = await Users.findOne({ account });
            if (user) return res.status(400).json({ msg: 'Email or Phone number already exists' });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                name,
                account,
                password: passwordHash
            })

            const active_token = generateAccessToken({newUser});

            res.status(200).json({ 
                status: 'OK',
                msg: 'Register successfully.',
                data: newUser,
                active_token
            });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

export default authController;