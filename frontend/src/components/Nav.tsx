import { Menu,X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import useValidateUser from "@/hooks/useValidateUser";

const Nav = ()=>{

    const [isMobile,setIsMobile] = useState<boolean>(false);
    const [isProfileModal,setIsProfileModal] = useState<boolean>(false);
    const [isLoggedIn,setIsLoggedIn] = useState<boolean | null>(null);
    const isUserValid = useValidateUser();

    useEffect(()=>{
        setIsLoggedIn(isUserValid);
    },[isUserValid])

    return(
        <div className="fixed top-3 left-0 right-0 flex justify-center items-center z-50">
            <div className="w-4/5 relative">
                <div className={`flex justify-between mx-auto px-4 py-[6px] bg-[linear-gradient(180deg,#aab6c822,#90a0b91a,#5d759b11)] backdrop-blur-md rounded-xl shadow-sm items-center`}>
                    <div>
                        <Link to='/'>
                            <p className="text-lg font-medium ">Splat</p>
                        </Link>
                    </div>
                        <div className={`relative hidden md:flex text-white gap-5 xl:gap-9`}>
                            <div className="relative">
                                <Link to='/' className="inline-block rounded-xl text-gray-600 font-medium hover:text-black"><span className="relative">Home</span></Link>
                            </div>
                            <div className="relative">
                                <Link to='/' className="inline-block rounded-xl text-gray-600 font-medium hover:text-black"><span className="relative">About</span></Link>
                            </div>
                            <div className="relative">
                                <Link to='/signup' className="inline-block rounded-xl text-gray-600 font-medium hover:text-black"><span className="relative">Contact</span></Link>
                            </div>
                            
                        </div>
                        <div className="hidden md:block relative text-white">
                            {!isLoggedIn?
                                <Link to='/signup' className="inline-block rounded-xl before:content-[''] before:absolute before:inset-0 before:bg-black/80 before:rounded-xl px-4 py-2 hover:before:bg-black"><span className="relative">Sign Up</span></Link>
                                :<div className="flex gap-2">
                                    <div className="relative">
                                        <Link to='/blog/post' className="inline-block rounded-xl before:content-[''] before:absolute before:inset-0 before:bg-black/80 before:rounded-xl px-4 py-2 hover:before:bg-black"><span className="relative">Write</span></Link>
                                    </div>
                                    <button className="text-black" onClick={()=>setIsProfileModal(!isProfileModal)}>
                                        Profile
                                    </button>
                                </div>

                            }
                        </div>
                        
                    <div className="md:hidden">
                        <button onClick={()=>setIsMobile(!isMobile)}>
                            {
                                isMobile?<X className="h-6 w-6" ></X>:<Menu className="h-6 w-6" ></Menu>
                            }
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className={`absolute hidden md:block transition-all duration-200 ease-out top-[100%] right-0 rounded-xl m-2 ${isProfileModal ? "h-auto opacity-100 bg-white shadow-lg":"h-0 opacity-0"}`}>
                        <div className="w-[200px]">
                            <p>djkal</p>
                        </div>
                    </div>
                </div>
                {(
                    <div className={`absolute md:hidden overflow-hidden transition-all duration-300 ease-in-out top-[100%] w-full mt-2 rounded-xl ${isMobile ? "max-h-[300px] opacity-100 bg-white shadow-lg": "max-h-0 opacity-0" }`}>
                        <div className="container mx-auto px-4 py-4 z-">
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
                                <Link to='/signin' className="">
                                    <button className="mt-2" onClick={() => setIsMobile(false)}>
                                        Start Writing
                                    </button>
                                </Link>
                            </nav>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Nav;