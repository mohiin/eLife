
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from '../components/ProductDetails';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';
import { fetchProducts, findProducts } from '../redux/productSlice';
import { useLocation } from 'react-router-dom';

export default function ProductPage() {

    const location = useLocation();
    const dispatch = useDispatch();

    const params = new URLSearchParams(location.search);
    const item = params.get("item");

    const [query, setQuery] = useState("");
    const productId = useSelector((state) => state.productDetailsModal.selectedProductId);
    const { productList: products, isLoading } = useSelector((state) => state.product);

    useEffect(() => {
        // Fetch all products on first load or when query is empty
        if (!query.trim()) {
            dispatch(fetchProducts());
        }
    }, [query, dispatch]);

    const handleSearch = () => {
        if (query.trim()) {
            dispatch(findProducts(query));
        } else {
            dispatch(fetchProducts());
        }
    };

    useEffect(() => {
        if (item && item != "All") {
            dispatch(findProducts(item)); // search with the item name
        } else {
            dispatch(fetchProducts()); // load all if no item passed
        }
    }, [item, dispatch]);


    return (
        <div >
            {productId && <ProductDetails />}

            <div className="join outline-0 mb-6">
                <div>
                    <label className="input join-item">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input className="outline-0" type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            name="q" placeholder="Product name" required />
                    </label>
                </div>
                <button onClick={handleSearch} className="btn btn-primary join-item">Search</button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64 mx-auto">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            ) : products.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <ProductItem product={product} />
                        </motion.div>
                    ))}
                </div>
            )
            }

        </div>
    )
}