import { assets } from "../assets/assets";


export default function Hero() {
    return (
        <div className="bg-[#c7d5f0] h-[80vh] p-4 flex flex-col-reverse sm:flex-row items-center justify-around">
            <div className="text sm:w-[40%] p-4 flex flex-col gap-2.5">
                <p className="font-bold sm:text-xl text-sm">Latest Trending</p>
                <h1 className="font-bold sm:text-4xl text-lg">Wireless Headphones</h1>
                <p className="sm:text-sm text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolores sit reiciendis
                    cumque nisi ea quam aliquid, deserunt, distinctio voluptatum ex velit dolorum hic odit,
                    iusto voluptates rerum! Commodi, laudantium.
                </p>
                <button className="btn btn-primary w-28"><a href="#product-display"> Show Now</a></button>
            </div>
            <img
                src={assets.topHeadphone} alt="headphone"
                className="max-w-[50%] w-full md:max-w-[45%] lg:max-w-[30%]" />
        </div>
    )
}