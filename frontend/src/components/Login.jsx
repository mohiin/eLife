import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";
import toast from "react-hot-toast";

export default function Login() {

    const location = useLocation();
    const redirectPath = location.state?.from || "/";

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(login(formData)).unwrap();//extract payload from promise
            if (result.success) {
                toast.success(result.message);
                navigate(redirectPath);

            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error || "Login failed. Please try again.");
        }
    }

    return (

        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 h-[70%] md:w-lg w-[95%] p-4 shadow-lg">
                <h2 className="font-semibold text-lg">Login</h2>
                <label className="fieldset-label">Email</label>
                <input onChange={handleChange} name="email" value={formData.email} type="email" className="input w-full" placeholder="Email" required />
                <label className="fieldset-label">Password</label>
                <input onChange={handleChange} name="password" value={formData.password} type="password" className="input w-full" placeholder="Password" required />
                <div><a className="link link-hover text-xs">Forgot password?</a></div>
                <button type="submit" className="btn btn-neutral mt-4">
                    {isLoading ? <span className="loading loading-spinner"></span> : "Login"}
                </button>
                <div>New to eLife? <Link to="/signup" className="link link-hover text-blue-600">Create Account</Link> </div>
            </form>
        </div>
    )
}