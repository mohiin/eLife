
import axios from "axios";
import { backendUrl } from "../config/url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function List() {

    const navigate = useNavigate();
    const { user, isLoading: userLoading } = useSelector((state) => state.user);

    const [products, setProducts] = useState([]);
    const adminProducs = async () => {
        try {
            const res = await axios.get(`${backendUrl}/products/admin/${user._id}`);
            setProducts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        adminProducs();
    }, [])

    const handleDeleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${backendUrl}/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (res.data.success) {
                toast.success("Product deleted successfully");
                setProducts((prev) => prev.filter((product) => product._id !== id));
            } else {
                toast.error(res.data.message || "Failed to delete product");
            }
        } catch (error) {
            console.log(error)
        }
    };

    if (userLoading) {
        return (
            <div className="flex justify-center items-center h-64 mx-auto">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if (products?.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-500 mx-auto">
                No products found.
            </div>
        );
    }

    return (
        <div className="flex-1 p-4">
            <table className="table">
                <thead >
                    <tr className="hidden md:grid grid-cols-6 gap-2">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={index} className="grid gap-2 grid-cols-3 md:grid-cols-6 mb-2">
                            <td>
                                <img
                                    className="h-10 object-contain"
                                    src={item.image}
                                    alt="product"
                                />
                            </td>
                            <td className="sm:text-xs text-sm">{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="toggle toggle-primary"
                                />
                            </td>
                            <td className="cursor-pointer">
                                <svg
                                    onClick={() => handleDeleteProduct(item._id)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 hover:stroke-red-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </td>
                            <td>
                                <button onClick={() => navigate(`/seller/update/${item._id}`)} className="btn btn-sm btn-outline btn-info">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
