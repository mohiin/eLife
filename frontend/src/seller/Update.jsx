import { useEffect, useState } from "react"
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../config/url";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/productSlice";

export default function Update() {

    const{id} = useParams();

    const { user, isLoading } = useSelector((state) => state.user);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });

    const { productList } = useSelector((state) => state.product);
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const product = productList.find((item) => item._id === id);

    // Update state with food data once food object is available
    useEffect(() => {
        if (product) {
            setData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image: product.image,
            });
        }
    }, [product]); // Only re-run when food changes

    const handleChange = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }


    const handleFileChange = (e) => {
        setData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };



    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted", data);

        try {
            setLoadingProducts(true);
            const res = await axios.put(`${backendUrl}/products/${id}`,{...data, owner: user._id},
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            toast.success(res?.data?.message);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setLoadingProducts(false);
        }

    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 mx-auto">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl p-4 flex-1">
            <form onSubmit={handleSubmit} className="w-full mx-auto p-4 flex flex-col gap-4">
                {/* Image Upload */}
                <div className="space-y-2 max-w-[700px]">
                    <p className="text-lg font-medium">Product Image</p>
                    <label htmlFor="image">
                       <img className="w-[120px]" src={data.image ? (typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)) : assets.upload_icon} alt="" />
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleFileChange}
                        hidden

                    />
                </div>

                {/* Product Name */}
                <div className="space-y-2 max-w-[700px]">
                    <label className="block text-lg font-medium">Product Name</label>
                    <input
                        type="text"
                        className="input w-full max-w-[700px] p-2"
                        placeholder="Type product name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="space-y-2 max-w-[700px]">
                    <label className="block text-lg font-medium">Product Description</label>
                    <textarea
                        className="textarea w-full max-w-[700px] p-2 h-32"
                        placeholder="Type product description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Price & Category */}
                <div className="space-y-2 max-w-[700px]">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                        {/* Price Input */}
                        <div className="flex-1">
                            <label className="block text-lg font-medium mb-2">Price ($)</label>
                            <input
                                type="number"
                                className="input w-full p-4"
                                placeholder="Enter price"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Category Select */}
                        <div className="flex-1">
                            <label className="block text-lg font-medium mb-2">Category</label>
                            <select className="select w-full p-2" name="category" value={data.category} onChange={handleChange} required>
                                <option value="" disabled>Pick a category</option>
                                <option value="Mobile" >Mobile</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Watch">Watch</option>
                                <option value="Headphone">Headphone</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button className="btn btn-primary mt-4 w-full md:w-28 py-2 px-4">
                    {loadingProducts ? <span className="loading loading-spinner"></span> : "Update"}
                </button>
            </form>
        </div>
    )
}