
import ProductModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";


const addProduct = async (req, res) => {
    // Validate if the file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }
    const { name, description, price, category, owner } = req.body;
    // Image URL
    let img_url = req.file.path;
    try {
        const newProduct = new ProductModel({
            name,
            description,
            price,
            category,
            image: img_url,
            owner,
        });

        await newProduct.save();
        res.json({ success: true, message: "product added" });
    } catch (error) {
        res.json({ success: false, message: error?.message });
    }
}

const deleteImageFromCloudinary = async (imageUrl) => {

    // Extract the public ID from the image URL
    const publicId = imageUrl.split('/').slice(-2, -1).concat(imageUrl.split('/').pop().split('.')[0]).join('/');
    try {
        await cloudinary.uploader.destroy(publicId);  // This deletes the image from Cloudinary
    } catch (error) {
        console.log('Error deleting image from Cloudinary', error?.message);

    }
};

const updateProduct = async (req, res) => {

    const { name, description, price, category } = req.body;
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    const updatedFields = {};

    if (name && name != product.name) updatedFields.name = name;
    if (description && description != product.description) updatedFields.description = description;
    if (price && price != product.price) updatedFields.price = price;
    if (category && category != product.category) updatedFields.category = category;
    // Check if the image path has changed
    if (req.file) {
        if (product.image && product.image !== req.file.path) {
            await deleteImageFromCloudinary(product.image);
        }
        updatedFields.image = req.file.path; // Only update the image field if a new image is provided
    }

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedFields);
        res.json({ success: true, message: "Product updated!", updatedProduct });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}


//get all the products to display frontend
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

//get products for an specific admin
const getProductsByAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        const productData = await ProductModel.find({ owner: adminId });
        res.json({ success: true, data: productData });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        if (product.image) {
            try {
                await deleteImageFromCloudinary(product.image);  // custom helper to delete from cloudinary
            } catch (err) {
                console.error("Failed to delete image:", err.message);
            }
        }

        await ProductModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Product and image deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

const searchProduct = async (req, res) => {
    const { q } = req.params;
    try {
        // Normalize query to include common synonyms
        const keywordMap = {
            phone: ['phone', 'mobile', 'cellphone', 'smartphone'],
            mobile: ['mobile', 'phone', 'smartphone'],
            // Add more synonym groups as needed
        };

        const normalizedKeywords = keywordMap[q.toLowerCase()] || [q];

        // Create regex array for all related keywords
        const regexArray = normalizedKeywords.map(term => ({
            "$or": [
                { name: { $regex: term, $options: "i" } },
                { category: { $regex: term, $options: "i" } },
            ]
        }));

        const result = await ProductModel.find({ $or: regexArray.flat() });
        res.json({ success: true, data: result });
    } catch (error) {
        console.log("Error in search products ", error);
        res.json({ success: false, message: error?.message });
    }
}

export { addProduct, updateProduct, getAllProducts, getProductsByAdmin, deleteProduct, searchProduct }