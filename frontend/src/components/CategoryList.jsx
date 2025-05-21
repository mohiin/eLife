import { assets, categoryList } from "../assets/assets";
import Category from "./Category";

export default function CategoryList() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <p className="bg-[#4169e1] w-[15px] h-[40px] rounded-lg"></p>
                <p className="font-bold text-xl">Categories</p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {
                categoryList.map((product, id) => (
                    <div key={id}>
                        <Category product={product}/>
                    </div>
                ))
            }
            </div>

        </div>
    )
}