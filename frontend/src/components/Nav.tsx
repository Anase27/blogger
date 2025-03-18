import { Menu,X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = ()=>{

    const [isMobile,setIsMobile] = useState(false);

    return(
        <div className="fixed top-3 left-0 right-0 flex justify-center">
            <div className="w-full ">
                <div className={`flex justify-between w-4/5 mx-auto px-4 py-2 bg-[linear-gradient(180deg,#aab6c822,#90a0b91a,#5d759b11)] backdrop-blur-md rounded-xl shadow-sm`}>
                    <div>
                        <p>Splat</p>
                    </div>
                    <div className="hidden md:block">
                        <Link to='/' className="rounded-xl before:content-[''] before:inset-0 before:bg-[#bad7f5]"><span>Sign Up</span></Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={()=>setIsMobile(!isMobile)}>
                            {
                                isMobile?<X className="h-6 w-6" ></X>:<Menu className="h-6 w-6" ></Menu>
                            }
                        </button>
                    </div>
                </div>
            </div>
            {(
                <div className={`absolute md:hidden overflow-hidden transition-all duration-300 ease-in-out top-[100%] w-4/5 m-2 rounded-xl ${isMobile ? "max-h-[300px] opacity-100 bg-white shadow-lg": "max-h-0 opacity-0" }`}>
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col gap-4">
                            <Link 
                                to="/" 
                                className="text-gray-700 hover:text-primary font-medium py-2"
                                onClick={() => setIsMobile(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/blog" 
                                className="text-gray-700 hover:text-primary font-medium py-2"
                                onClick={() => setIsMobile(false)}
                            >
                                Blog
                            </Link>
                            <Link 
                                to="/about" 
                                className="text-gray-700 hover:text-primary font-medium py-2"
                                onClick={() => setIsMobile(false)}
                            >
                                About
                            </Link>
                            <Link 
                                to="/contact" 
                                className="text-gray-700 hover:text-primary font-medium py-2"
                                onClick={() => setIsMobile(false)}
                            >
                                Contact
                            </Link>
                            <button className="mt-2" onClick={() => setIsMobile(false)}>
                                Start Writing
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nav;