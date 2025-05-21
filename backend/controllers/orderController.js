
import Stripe from "stripe";
import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import frontendUrl from "../config/url.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const { userId, address, items, amount } = req.body;

    //validation
    if(!userId || !address || !items || !amount){
        return res.json({success: false, message:"userId, address, items, amount are required"});
    }

    try {
        const newOrder = new OrderModel({
            userId,
            address,
            items,
            amount,
        });

        await newOrder.save();
        //remove item from cart
        for(const item of items){
            await UserModel.findByIdAndUpdate(
                userId,
                {$pull : {cartData:{ _id: item._id}}}
            )
        }

        //for stripe payment
        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "deliver fee",
                },
                unit_amount: 2*100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontendUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/order/cancel`,
            metadata: {
                orderId: newOrder._id.toString(),
                userId: userId,
            },
        });

        res.json({success: true, session_url: session.url});
    } catch (error) {
        console.log("Error placing order:", error);
        res.json({ success: false, message: "Failed to place order" });
    }
}

const verifySession = async (req, res) => {
    const sessionId = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const orderId = session.metadata.orderId;
            await OrderModel.findByIdAndUpdate(orderId, { status: "processing", payment: true });

            res.status(200).json({ success: true, message: "Payment verified", session });
        } else {
            res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Error verifying session:", error);
        res.status(500).json({ message: "Failed to verify payment" });
    }
};

//user orders
const userOrders = async(req, res) => {
    const { userId } = req.params;
    try {
        const data = await OrderModel.find({userId})
        res.json({success: true, data});
    } catch (error) {
        res.json({success: false, message: error?.message});
    }
}

//orders of admin
const orders = async(req, res) => {
    const { adminId } = req.params;
    try {
        const data = await OrderModel.find({
            items: { $elemMatch: {owner: adminId}}
        });

        res.json({success: true, data});
    } catch (error) {
        res.json({success: false, message: error?.message});
    }
}

export { placeOrder, verifySession, userOrders, orders };