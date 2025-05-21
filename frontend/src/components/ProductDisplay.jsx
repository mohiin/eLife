
import { useSelector } from "react-redux";
import ProductItem from '../components/ProductItem';
import ProductDetails from './ProductDetails';
import { useNavigate } from 'react-router-dom';

export default function ProductDisplay({ category, title, productList }) {

    const productId = useSelector((state) => state.productDetailsModal.selectedProductId);
    const navigate = useNavigate();

    return (
        <div id="product-display" >
            {productId && <ProductDetails />}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <p className="bg-[#4169e1] w-[15px] h-[40px] rounded-lg"></p>
                    <p className="font-bold text-xl">{category}</p>
                </div>
                <h1 className="text-3xl font-bold">{title}</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {productList.map((product) => (
                    <div key={product._id}>
                        <ProductItem product={product} />
                    </div>
                ))}
                <button onClick={()=> navigate("/products")} className="btn btn-outline btn-primary">Show all products</button>
            </div>

        </div>
    );
}
