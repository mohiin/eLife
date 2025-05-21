import { NavLink, Outlet, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Seller() {

    const location = useLocation();
    const isOnSellerRoot = location.pathname === "/seller";

    return (
        <div className="flex">
            <ul className="menu  rounded-box">
                <li>
                    <NavLink to={"/seller/add"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <p className="hidden md:block">Add</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/seller/list"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>


                        <p className="hidden md:block">List</p>
                    </NavLink>
                </li>
                <li>

                    <NavLink to="/seller/orders">
                        <img src={assets.order_icon} alt="" className="w-8 p-1" />
                        <p className="hidden md:block">Orders</p>
                    </NavLink>
                </li>
            </ul>

            {
                isOnSellerRoot ? (
                    <h1 className="font-bold text-2xl m-auto">Seller Dashboard</h1>
                )

                    : (<Outlet />)
            }

        </div>

    )
}