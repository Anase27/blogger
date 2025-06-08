import { useEffect, useState } from "react"
import { Terminal, ChevronLeft,BookOpen, MoveDown } from "lucide-react";
import Nav from "@/components/Nav";

const HomePage = ()=>{
    const [isLoaded,setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
    },[])
    return(
        <>
            <div className="min-h-screen overscroll-none">
                <section className="relative h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-white pt-20 pb-10">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] opacity-90"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100%_40px] bg-[position:center] opacity-90"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="bg-gradient-to-t from-white to-transparent h-6 w-full"></div>
                    </div>
                    <div className="px-4 text-center">
                        <div className="flex justify-center p-4 gap-4">
                            <div>
                                <Terminal className="inline" />
                                <ChevronLeft className="p-0 -mx-2 inline"/>
                            </div>
                            <BookOpen />
                        </div>
                        <div className="mb-4">
                            <span className="bg-gray-300 px-4 py-1 rounded-2xl mt-6">
                                Share Your Developer Journey
                            </span>
                        </div>
                        <div className="mb-6 text-5xl md:text-6xl lg:text-7xl tracking-tight font-bold">
                            <p>Code. Learn.<br/>Share. Grow.</p>
                        </div>
                        <div className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            <p>Join a community of developers sharing their insights, discoveries, and solutions.</p>
                        </div>
                        <div className="p-2 bg-neutral-200 animate-bounce w-min rounded-full mx-auto border-2 border-gray-400">
                            <MoveDown strokeWidth={1}/>
                            {/* <MoveDown size={16} strokeWidth={0.5} /> */}
                        </div>
                    </div>
            
                </section>
                <div>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                    <p>dkalj</p>
                </div>
            </div>
            <div className=''>
                <Nav></Nav>
            </div>
        </>
    )
}

export default HomePage;