import { useNavigate } from "react-router-dom"

export default function Category({ product }) {
    const navigate = useNavigate();

    return ( 
            <div className="bg-base-100 shadow-sm h-[100px] flex items-center p-1 transition delay-150 duration-300 ease-out hover:scale-[1.1] hover:cursor-pointer">

                <div className="bg-[#c7d5f0] flex items-center p-1 h-full">
                    <img
                        className="w-16"
                        src={product.url}
                        alt="item" />
                </div>

                <div onClick={() =>navigate(`/products?item=${product.name}`) } className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.item}</p>
                </div>
            </div>
      


    )
}