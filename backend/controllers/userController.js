import userModel from "../models/userModules.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { errorHandler } from "../utils/error.js";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json({ success: true, userId : user._id, token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (at least 8 characters)" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { loginUser, registerUser };
