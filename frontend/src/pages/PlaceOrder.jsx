import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendUrl } from "../config/url";
import toast from "react-hot-toast";

export default function PlaceOrder() {

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartData = useSelector((state) => state.cart.cartData);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (cartData.length === 0) {
      toast.error("Add some products to place order");
      navigate("/products");
    }
  }, [cartData, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.phone.match(/^[0-9]{7,15}$/)) newErrors.phone = "Enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const orderItems = [...cartData];
      const orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount + 2,
        userId: user._id,
        payment: paymentMethod === "online" ? true : false,
        status: "processing",
      };

      if (paymentMethod === "cod") {
        try {
          const res = await axios.post(`${backendUrl}/order/place`, orderData);
          if (res.data.success) {
            toast.success("Order placed successfully with Cash on Delivery!");
            navigate("/myorders");
          }
        } catch (error) {
          toast.error("Failed to place COD order.");
        }
      } else {
        // For online payments
        const res = await axios.post(`${backendUrl}/order/place`, orderData);
        if (res.data.success) {
          const { session_url } = res.data;
          window.location.replace(session_url);
        } else {
          toast.error("Payment failed");
        }
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-[50px] mt-20">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2">
        <h2 className="font-bold sm:text-lg text-sm">Delivery Information</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Your name"
          className={`input w-full ${errors.name ? "input-error" : "input-primary"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          className={`input w-full ${errors.email ? "input-error" : "input-primary"}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          type="text"
          placeholder="Street"
          className={`input w-full ${errors.street ? "input-error" : "input-primary"}`}
        />
        {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}

        <div className="flex gap-3 w-full">
          <div className="w-full">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="City"
              className={`input w-full ${errors.city ? "input-error" : "input-primary"}`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="w-full">
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              className={`input w-full ${errors.country ? "input-error" : "input-primary"}`}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
        </div>

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="text"
          placeholder="Phone"
          className={`input w-full ${errors.phone ? "input-error" : "input-primary"}`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}


        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio checked:radio-primary"
            />
            <span className="label-text mr-4">Cash on Delivery</span>

          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio checked:radio-primary"
            />
            <span className="label-text">Online Payment</span>

          </label>
        </div>


        <button type="submit" className="btn btn-primary max-w-44 mt-4">
          Proceed to payment
        </button>
      </form>

      <div className="flex-1 flex flex-col gap-4 md:max-w-[45%]">
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
      </div>
    </div>
  );
}
