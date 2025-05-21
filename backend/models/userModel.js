
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    cartData:{
        type: Array,
        default: [],
    }
}, {minimize: false})//for storing empty object


const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;