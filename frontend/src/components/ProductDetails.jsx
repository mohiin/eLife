
// import { productList } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { closeProductDetails } from "../redux/productModalSlice";
import { addToCart } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/productSlice";

export default function ProductDetails() {



    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const productList = useSelector((state) => state.product.productList);

    const id = useSelector((state) => state.productDetailsModal.selectedProductId);
    const product = productList.find(item => (item._id == id));


    const handleClose = () => {
        dispatch(closeProductDetails());
    };

    const handleAddToCart = (item) => {
        if (!user || !user._id) {
            toast.error("You must be logged in to add items to cart.");
            return;
        }
        dispatch(addToCart({ userId: user._id, item }));
        toast.success("Item added");
    }

    return (
        <div className="h-[100vh] w-[100%] flex items-center justify-center bg-[#00000090] fixed top-0 left-0 z-20">

            <div className="card card-side bg-base-100 shadow-sm h-[70%] w-[95%] md:w-[70%] lg:w-3xl">
                <figure className="w-96 h-full flex justify-center items-center">
                    <img
                        className="w-full h-[80%] object-contain"
                        src={product.image}
                        alt="Product" />

                </figure>
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <button onClick={() => handleClose(product._id)} className="btn btn-square btn-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <h2 className="card-title">{product.name}</h2>
                    <p>$ {product.price}</p>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <button
                            onClick={() => handleAddToCart(product, product._id)}
                            className={`btn btn-primary`}>
                            {isLoading ? <span className="loading loading-spinner"></span> : "Add to cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}