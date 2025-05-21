
import express from "express";
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import frontendUrl from "./config/url.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port =  process.env.PORT || 4000;

//middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors({
    origin: frontendUrl, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

//db connection
connectDB();

//api endpoints
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
    res.send("server is running.....");
})

app.listen(port, (req, res) => {
    console.log(`app is listing on port ${port}`);
})