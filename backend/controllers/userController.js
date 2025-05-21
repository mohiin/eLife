import UserModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


//signup or register user
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists!" });
        }


        if (!email || !validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate a JWT
        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }

        );

        // Return the token and user details
        res.json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.log("Error during registration:", error);
        res.json({ success: false, message: "Internal server error" });

    }
}

//login the user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exits" });
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        // Generate a JWT
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            },
        )
        // req.session.user = { _id: user._id, username: user.username, cartData: user.cartData };
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        console.log("Error during login:", error);
        res.json({ message: "Internal server error" });
    }
}

const currentUser = async (req, res) => {
    try {
        // User data is attached to req.user by the authenticate middleware
        const user = await UserModel.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }

}

export { register, loginUser, currentUser };