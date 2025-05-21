import UserModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    const { userId, item } = req.body;
    if(!userId){
        return res.json({success: false, message: "User id is required"});
    }
    try {
        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({success: false, message:"User not found!"});
        }
        const cartData = await user.cartData;
        const existingItem = cartData.find(cartItem => cartItem._id == item._id);
        if(existingItem){
            existingItem.quantity += 1;
        }else{
            cartData.push({...item, quantity: 1});
        }
        await UserModel.findByIdAndUpdate(userId, {cartData});
        res.json({ success: true, message: "Item added!", cartData: cartData });
    } catch (error) {
        console.log("Error during item adding to cart ", error);
        res.json({ success: false, message: "Item not added!" });
    }
}

const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        if(!userId || !itemId){
            return res.json({success: false, message: "userId & itemId is required"});
        }

        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        const cartData = user.cartData;
        const updatedCart = cartData.filter(cartItem => cartItem._id !== itemId);
        user.cartData = updatedCart;
        await user.save();
        res.json({success: true, message:"Item removed!", cartData: updatedCart});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error during removing item"});
    }
}

const getCartData = async (req, res) => {
    const { userId } = req.params;

    try {
        if(!userId){
            return res.json({success: false, message: "userId is required"});
        }
        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        const cartData = user.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error?.message});
    }
}

export { addToCart, removeFromCart, getCartData };