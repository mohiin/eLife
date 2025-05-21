import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../redux/userSlice";
import toast from "react-hot-toast";


export default function Signup() {

    const location = useLocation();
    const redirectPath = location.state?.from || "/";
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const{isLoading} = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setFormData((prev) => {
            return { ...prev, [fieldName]: fieldValue };
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(register(formData)).unwrap();
            if (result.success) {
                toast.success(result.message);
                navigate(redirectPath);

            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error || "Signup failed. Please try again.");
        }
    }

    return (

        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-4">
            <form onSubmit={handleRegister} className="flex flex-col gap-4 h-[70%] md:w-lg w-[95%] p-4 shadow-lg">
                <h2 className="font-semibold text-lg">Sign up</h2>
                <label className="fieldset-label">Username</label>
                <input value={formData.username} onChange={handleChange} name="username" type="text" className="input w-full" placeholder="Username" required />
                <label className="fieldset-label">Email</label>
                <input value={formData.email} onChange={handleChange} name="email" type="email" className="input w-full" placeholder="Email" required />
                <label className="fieldset-label">Password</label>
                <input value={formData.password} onChange={handleChange} name="password" type="password" className="input w-full" placeholder="Password" required />
                <button type="submit" className="btn btn-neutral mt-4">
                    {isLoading ? <span className="loading loading-spinner"></span> : "Sign up"}
                </button>
                <div>Already have an account? <Link to="/login" className="link link-hover text-blue-600">Login</Link> </div>
            </form>
        </div>
    )
}