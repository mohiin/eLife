import { addToCart } from "../redux/cartSlice";


export default function AddBtn() {

    const handleAddToCart = (item, id) => {
        dispatch(addToCart(item));
    }

    return (
        <button onClick={() => handleAddToCart(product, product.id)} className="btn btn-primary">Add ot cart</button>
    )
}