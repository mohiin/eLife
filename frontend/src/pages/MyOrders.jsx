import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../config/url";
import { useSelector } from "react-redux";


export default function MyOrders() {
    const { user, isLoading: userLoading } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const userOrders = async () => {
        try {
            const res = await axios.get(`${backendUrl}/order/user/${user._id}`);
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userOrders();
    }, [])

    return (


        <div className="flex flex-col gap-4">
            <h2 className="font-bold sm:text-lg text-sm">My Orders</h2>

            {orders?.length ?
                orders.map((order, index) => (
                    order.items.map((item, itemIndex) => (
                        <div
                            key={`${order._id}-${itemIndex}`}
                            className="grid grid-cols-[1fr_2fr_0.5fr_0.5fr_1fr_1fr] gap-2 items-center bg-gray-100 p-2 mb-2 rounded"
                        >
                            <img
                                className="h-10 object-contain"
                                src={item.image}
                                alt={item.name}
                            />
                            <p className="sm:text-xs text-sm">{item.name}</p>
                            <p>${item.price}</p>
                            <p>{item.quantity}</p>
                            <p className="text-green-600 flex items-center gap-1">
                                <span className="text-blue-700">&#x25cf;</span>
                                {order.status || "Order placed"}
                            </p>
                            <button className="btn btn-primary btn-outline sm:text-xs text-sm">
                                Track
                            </button>
                        </div>
                    ))
                )) : (
                    <p className="text-gray-500">No orders found.</p>
                )}


        </div>

    )
}



