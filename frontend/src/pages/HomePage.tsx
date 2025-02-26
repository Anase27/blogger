import { useEffect, useState } from "react"


const HomePage = ()=>{
    const [isLoaded,setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
    },[])
    return(
        <div className="min-h-screen">
            <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-300 to-white">
                <div className="absolute inset-0 pointer-events-none">
                    {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_3px,transparent_3px)] bg-[size:40px] bg-[position:center] "></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_3px,transparent_3px)] bg-[size:40px] bg-[position:center]"></div> */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_3px,transparent_1px),linear-gradient(to_bottom,#80808012_3px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

                </div>

                <div className="px-4 text-center">
                    <span className="bg-gray-300">
                        Share your developer journey
                    </span>
                </div>
            </section>
        </div>
    )
}

export default HomePage;