
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";
import ProductDisplay from "../components/ProductDisplay";
import { useEffect } from "react";
import { fetchProducts } from "../redux/productSlice";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Home() {

    const dispatch = useDispatch();
    const location = useLocation();
    const { productList: products, isLoading } = useSelector((state) => state.product);

    useEffect(() => {
        // refetch products when navigating to this page
        dispatch(fetchProducts());
    }, [location.pathname, dispatch]);

    const featuredProducts1 = products.slice(0, 4);
    const featuredProducts2 = products.slice(10, 14);
    const featuredProducts3 = products.slice(18, 22);
    return (
        <div className="flex flex-col gap-20">
            <Hero />
            <CategoryList />
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            ) : (
                <>
                    <motion.div
                        // key={product._id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <ProductDisplay category={"All Electronics"} title={"Explore Best Sellers"} productList={featuredProducts1} />
                    </motion.div>

                    <>
                        <motion.div
                            // key={product._id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <ProductDisplay category={"New Collection"} title={"Discover Our Latest Collection"} productList={featuredProducts2} />
                        </motion.div>

                    </>
                    <>
                        <motion.div
                            // key={product._id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <ProductDisplay category={"Deal of the Day"} productList={featuredProducts3} />
                        </motion.div>

                    </>

                </>
            )}

        </div>
    )
}