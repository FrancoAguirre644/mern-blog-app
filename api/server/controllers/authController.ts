import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateActiveToken } from '../config/generateToken';
import { validateEmail, validPhone } from '../middleware/valid';
import { sendSms } from '../config/sendSMS';
import { IDecodedToken } from '../config/interfaces';

const CLIENT_URL = `${process.env.BASE_URL}`

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body;

            const user = await Users.findOne({ account });
            if (user) return res.status(400).json({ msg: 'Email or Phone number already exists' });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = { name, account, password: passwordHash }

            const active_token = generateActiveToken({newUser})

            const url = `${CLIENT_URL}/active/${active_token}`

            if (validateEmail(account)) {
                //sendMail(account, url, "Verify your email address")
                return res.json({ msg: "Success! Please check your email." })

            } else if (validPhone(account)) {
                //sendSms(account, url, "Verify your phone number")
                return res.json({ msg: "Success! Please check phone.", active_token })
            }

            res.status(200).json({
                status: 'OK',
                msg: 'Register successfully.',
                data: newUser,
                active_token
            });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    activeAccount: async (req: Request, res: Response) => {
        try {
            
            const { active_token } = req.body

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

            const { newUser } = decoded

            if (!newUser) return res.status(400).json({ msg: "Invalid authentication." })

            const user = new Users(newUser)

            await user.save() 

            res.json({ msg: "Account has been activated!", token: active_token }) 

        } catch (err: any) {

            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.keys(err.keyValue)[0] + " already exists."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            } 

            return res.status(500).json({ msg: errMsg })
        }
    },
}

export default authController;