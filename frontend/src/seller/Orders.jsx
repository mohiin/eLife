
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../config/url";
import { useSelector } from "react-redux";

export default function Orders() {
    const { user, isLoading: userLoading } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const getOrders = async () => {
        try {
            setLoadingOrders(true);
            const res = await axios.get(`${backendUrl}/order/admin/${user._id}`);
            setOrders(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        if (!userLoading && user?._id) {
            getOrders();
        }
    }, [userLoading, user]);

    if (userLoading || loadingOrders) {
        return (
            <div className="flex justify-center items-center h-64 mx-auto">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-500 mx-auto">
                No orders found.
            </div>
        );
    }

    return (
        <div className="flex-1 p-4">
            {orders.map((order, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-start border border-gray-200 p-2">
                    <img src={order.items[0].image} alt="product" className="h-full w-20 object-contain" />
                    <div>
                        {
                            order.items.map((item, index) => (
                                <p key={index}>{item.name} x {item.quantity}</p>
                            ))
                        }
                        <p className="font-semibold">{order.items.name}</p>
                        <p><strong>{order.address.name}</strong></p>
                        <p>{order.address.street}</p>
                        <p>{order.address.city}, {order.address.country}</p>
                        <p>{order.address.phone}</p>
                    </div>
                    <p>Items: {order.items.length}</p>

                    <p>${order.amount}</p>
                    <select className="select w-full p-2">
                        <option value="Processing">Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled ">Cancelled </option>
                        <option value="Returned ">Returned </option>
                    </select>
                </div>
            ))}
        </div>
    );
}
