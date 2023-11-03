import bcrypt from "bcrypt";
import User, { UserDocument } from "../model/user";
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';

const authController = {
    // Register
    registerUrl: async (req: Request, res: Response) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create New User
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                Gender: req.body.Gender,
                address: req.body.address,
                dateOfBirth: req.body.dateOfBirth,
                role: req.body.role,
                password: hashed
            });

            // Save
            const savedUser = await newUser.save();
            return res.status(200).json(savedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const user: UserDocument | null = await User.findOne({ email: req.body.email });
            if (!user) {
                res.status(404).json("wrong email");
            } else {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (!validPassword) {
                    res.status(404).json("wrong password");
                } else {
                    const accessToken = jwt.sign({
                        id: user.id,
                        role: user.role
                    },
                        process.env.JWT_ACCESS_KEY as string,
                        {
                            expiresIn: "365d"
                        })

                    return res.status(200).json({ user, accessToken });
                }
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

export default authController;

export async function loginUser(req: Request, res: Response) {
    authController.loginUser(req, res);
}


export async function registerUrl(req: Request, res: Response) {
    authController.registerUrl(req, res);
}