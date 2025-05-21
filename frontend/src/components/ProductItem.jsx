import { useState } from "react"
import toast from "react-hot-toast";
import { openProductDetails } from "../redux/productModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductItem({ product }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { isLoading } = useSelector((state) => state.cart);

    const handleAddToCart = (item) => {
        if (!user || !user._id) {
            toast.error("You must be logged in to add items to cart.");
            return;
        }
        dispatch(addToCart({userId: user._id, item}));
        toast.success("Item added");
    }

    const handleCardClick = (id) => {
        dispatch(openProductDetails(id)); 
    };
    
    return (
        <>

            <div key={product.id} className="card bg-base-100 shadow-sm group">
                <div className="bg-[#c7d5f0] p-1 h-[198px] w-full flex items-center justify-center relative">
                    <img
                        className="h-full"
                        src={product.image}
                        alt="product"
                        onClick={() => handleCardClick(product._id)}
                    />
                    <div className="flex flex-col  opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                        <div className="absolute bottom-1/2 right-1/2  transform translate-x-1/2 translate-y-1/2">

                            <p onClick={() => handleCardClick(product._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </p>
                        </div>
                        <button
                            onClick={() =>handleAddToCart(product)}
                            className={`btn btn-primary absolute bottom-0 left-0 w-full mt-2`}>
                            {isLoading ? <span className="loading loading-spinner"></span> : "Add to cart"}
                        </button>
                    </div>
                </div>

                <div onClick={() => handleCardClick(product._id)} className="card-body">
                    <p className="card-title">{(product.name).slice(0, 15)}</p>
                    <p>${product.price}</p>
                </div>
            </div>

        </>
    )
}