
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    imageDeleteUrl: { type: String },
    category: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

});

const ProductModel = mongoose.models["product"] || mongoose.model("product", productSchema);

export default ProductModel;