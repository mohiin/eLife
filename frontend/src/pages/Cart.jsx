import { useDispatch, useSelector } from "react-redux"
import { clearCart, getCartData, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";


export default function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart.cartData);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const { user } = useSelector((state) => state.user);
    const isLoggedin = user;

    const handleRemoveFormCart = (itemId) => {
        dispatch(removeFromCart({ userId: user._id, itemId}));
        toast.success("Item removed");
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }

    useEffect(() => {
        if(user){
            dispatch(getCartData(user._id));
        }
    }, [dispatch, user])

    return (
        <div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartData.map((item, index) => {
                                return (

                                    <tr key={index}>
                                        <td>

                                            <img
                                                className=" h-10 object-contain"
                                                src={item.image}
                                                alt="product image" />

                                        </td>
                                        <td className="sm:text-xs text-sm">{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td onClick={() => handleRemoveFormCart(item._id)} className="cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-red-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
                {
                    cartData.length > 0 && <button onClick={() => handleClearCart()} className="btn text-white bg-red-600 mt-6">Clear cart</button>
                }
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-6 mt-24">
                <div className="flex-1 flex flex-col gap-4 md:max-w-[50%]">
                    <h2 className="font-bold sm:text-lg text-sm">Cart Total</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Delivery fee</p>
                            <p>${totalAmount && 2}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total</p>
                            <p>${totalAmount && totalAmount + 2}</p>
                        </div>
                    </div>

                    {
                        cartData.length > 0 && <button onClick={() => {
                            if (isLoggedin) {
                                navigate("/order");
                            } else {
                                navigate("/login", { state: { from: "/order" } }); // pass desired redirect path
                            }
                        }
                        }
                            className="btn btn-primary max-w-44">
                            Proceed to checkout
                        </button>
                    }


                </div>

                <div className="join">
                    <div>
                        <label className="input join-item">
                            <input type="search" placeholder="Enter promo code" required />
                        </label>
                    </div>
                    <button className="btn btn-neutral join-item">Submit</button>
                </div>
            </div>
        </div >
    )
}