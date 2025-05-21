
import { useState } from "react";
import { assets } from "../assets/assets.js"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice.js";
import { clearCart } from "../redux/cartSlice.js";

export default function Navbar() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isLoggedin = user;
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.cart.cartData);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if page has scrolled
            if (window.scrollY > 0) {
                setScrolled(true); // Add shadow
            } else {
                setScrolled(false); // Remove shadow
            }
        };

        // Add event listener on component mount
        window.addEventListener("scroll", handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
    };

    return (

        <div className={`navbar bg-base-100 mb-8 sticky top-0 z-10 px-1 sm:px-36 ${scrolled && "shadow-sm "}`}>
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost"><img className="w-24" src={assets.logo} alt="elife" /></Link>
            </div>
            <div className="flex-none">
                <div className="navbar-center hidden md:block lg:block">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/products"}>Products</Link>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <Link to={"/seller"}>Seller</Link>
                        </li>
                    </ul>
                </div>

                <div className="md:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow right-[30px] font-semibold">
                            <li>
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link to={"/products"}>Products</Link>
                            </li>
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <Link to={"/seller"}>Seller</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div onClick={() => navigate("/cart")} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className="badge badge-sm indicator-item">{totalQuantity}</span>
                </div>
            </div>

            <div className="dropdown dropdown-end ml-3">

                {
                    isLoggedin ? (
                        <>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </>
                    ) : (
                        <div className="flex gap-1 justify-between">
                            <button onClick={() => navigate("/login")} className="btn btn-primary btn-outline rounded-full">Login</button>
                            {/* <button onClick={() => navigate("/signup")} className="btn btn-primary rounded-full">Sign up</button> */}
                        </div>
                    )
                }
            </div>
        </div>



    )
}