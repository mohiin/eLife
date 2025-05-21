import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductsByAdmin, searchProduct, updateProduct } from "../controllers/productController.js";
import authenticate, { validateProduct } from "../middleware/middleware.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const productRouter = express.Router();

const upload = multer({
  storage: storage,
  limits: { fileSize: 7 * 1024 * 1024 } // limit to 5 MB,
});


productRouter.post("/", authenticate, upload.single("image"), validateProduct, addProduct);
productRouter.put("/:id", upload.single("image"), updateProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/admin/:adminId", getProductsByAdmin);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/search/:q", searchProduct);

export default productRouter;