
import jwt from "jsonwebtoken";
import { productSchema } from "../validations.js";

const authenticate  =  (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    
    if (!token) {
        return res.json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object
        next();
    } catch (error) {
        res.json({ message: "Invalid token" });
    }
}

export default authenticate;


export const validateProduct = (req, res, next) => {
    let{error} = productSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({ success: false, errMsg });
    }else{
        next();
    }
}