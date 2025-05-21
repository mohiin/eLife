import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { backendUrl } from "../config/url";
import { useNavigate } from "react-router-dom";


export default function Profile() {
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.user);
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

    if (loading || !user) {
        return <div className="flex justify-center items-center h-64 mx-auto">
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Profile Info */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title">User Profile</h2>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User ID:</strong> {user._id}</p>
                    </div>
                </div>

                {/* Order History Preview */}
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="card-title">Recent Orders</h2>
                            <button
                                onClick={() => navigate("/myorders")}
                                className="btn btn-sm btn-outline btn-primary"
                            >
                                View All Orders
                            </button>
                        </div>

                        {orders?.length ? (
                            <div className="space-y-4">
                                {orders.slice(0, 3).map((order) => (
                                    <div key={order._id} className="border rounded-lg p-3 bg-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm text-gray-600">
                                                <strong>Date:</strong>{" "}
                                                {new Date(order.date).toLocaleDateString()}
                                            </p>
                                            <p className="badge badge-outline badge-success">
                                                {order.payment? "paid" : "unpaid"}
                                            </p>
                                        </div>
                                        {order.items.map((item, index) => (
                                            <div
                                                key={`${order._id}-${index}`}
                                                className="grid grid-cols-[1fr_2fr_0.5fr_0.5fr_1fr] gap-2 items-center bg-white p-2 rounded mb-2"
                                            >
                                                <img
                                                    className="h-10 object-contain"
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                                <p className="sm:text-xs text-sm">{item.name}</p>
                                                <p>${item.price}</p>
                                                <p>{item.quantity}</p>
                                                <button className="btn btn-xs btn-outline">Track</button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}