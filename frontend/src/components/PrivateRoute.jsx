import { useDispatch, useSelector } from "react-redux"
import Login from "./Login";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../redux/userSlice";


export default function PrivateRoute() {
    const { user, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Run once on mount
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64 mx-auto">
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }

    return user ? <Outlet /> : <Login />;

}