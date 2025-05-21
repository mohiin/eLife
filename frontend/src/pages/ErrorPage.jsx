import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
            <h1 className="text-6xl font-bold text-error">404</h1>
            <p className="text-2xl mt-4 text-base-content">Oops! Page not found.</p>
            <p className="text-base mt-2 text-base-content/70">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary mt-6">
                Go Home
            </Link>
        </div>
    );
}
