import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateActiveToken, generateRefreshToken } from '../config/generateToken';
import { validateEmail, validPhone } from '../middleware/valid';
import { sendSms, smsOTP, smsVerify } from '../config/sendSMS';
import { IDecodedToken, IUser } from '../config/interfaces';
import sendEmail from '../config/sendMail';

const CLIENT_URL = `${process.env.BASE_URL}`

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body;

            const user = await Users.findOne({ account });
            if (user) return res.status(400).json({ msg: 'Email or Phone number already exists' });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = { name, account, password: passwordHash };

            const active_token = generateActiveToken({ newUser });

            const url = `${CLIENT_URL}/active/${active_token}`;

            if (validateEmail(account)) {
                sendEmail(account, url, "Verify your email address");
                return res.json({ msg: "Success! Please check your email." });

            } else if (validPhone(account)) {
                sendSms(account, url, "Verify your phone number")
                return res.json({ msg: "Success! Please check phone.", active_token });
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

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);

            const { newUser } = decoded;

            if (!newUser) return res.status(400).json({ msg: "Invalid authentication." });

            const user = await Users.findOne({ account: newUser.account });
            if (user) return res.status(400).json({ msg: "This user already have an account." })

            const new_user = new Users(newUser);

            await new_user.save();

            res.json({ msg: "Account has been activated!", token: active_token });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { account, password } = req.body;

            const user = await Users.findOne({ account });
            if (!user) return res.status(400).json({ msg: 'This account does not exists.' });

            loginUser(user, password, res);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refreshToken', { path: `/api/refresh_token` })

            return res.status(200).json({ msg: 'Logged out!' })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token) return res.status(400).json({ msg: 'Please login now!' });

            const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
            if (!decoded.id) return res.status(400).json({ msg: 'Please login now!' });

            const user = await Users.findById(decoded.id).select("-password");
            if (!user) return res.status(400).json({ msg: 'This account does not exists.' });

            const access_token = generateAccessToken({ id: user._id });

            res.status(200).json({ access_token, user });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    loginSMS: async (req: Request, res: Response) => {
        try {

            const { phone } = req.body;

            const user = await Users.findOne({ account: phone });
            if (!user) return res.status(400).json({ msg: 'This account does not exists.' });

            const data = await smsOTP(phone, 'sms');

            res.json(data);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    smsVerify: async (req: Request, res: Response) => {
        try {

            const { phone, code } = req.body;

            const data = await smsVerify(phone, code);

            if (!data?.valid) return res.status(400).json({ msg: "Invalid Authentication." });

            const password = phone + 'your phone secret password';

            const user = await Users.findOne({ account: phone });

            if (user) loginUser(user, password, res, true);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

const loginUser = async (user: IUser, password: string, res: Response, isLoginSMS: boolean = false) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && !isLoginSMS) return res.status(500).json({ msg: 'Password is incorrect.' });

    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id });

    res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(200).json({
        msg: 'Login success!',
        access_token,
        user: { ...user._doc, password: '' }
    })

}

export default authController;