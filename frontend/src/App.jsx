import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footere";
import Login from "./components/Login";
import ProductPage from "./pages/ProductPage";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import Signup from "./components/Signup";
import SuccessPage from "./pages/SuccessPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/userSlice";
import { getCartData } from "./redux/cartSlice";
import Seller from "./seller/Seller";
import Add from "./seller/Add";
import List from "./seller/List";
import Orders from "./seller/Orders";
import { fetchProducts } from "./redux/productSlice";
import Update from "./seller/Update";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";

export default function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getCartData(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  return (
    <>
      <Navbar />
      <div className="sm:px-10 md:px-36 px-2 min-h-[60vh]">
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute />} >
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/success" element={<SuccessPage />} />

            <Route path="/seller" element={<Seller />} >
              <Route path="add" element={<Add />} />
              <Route path="list" element={<List />} />
              <Route path="orders" element={<Orders />} />
              <Route path="update/:id" element={<Update />} />
            </Route>
          </Route>
          
          <Route path="*" element={<ErrorPage/> }/>
        </Routes>    
      </div>
      <Footer />
    </>

  )
}