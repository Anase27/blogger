import { SigninInput } from "@anase/medium-common";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "./config";
import { useNavigate,Link } from "react-router-dom";
// type errortype = {
//     email: string,
//     password: string
// }
const Signin = () => {
    const [inputValues,setInputValues] = useState<SigninInput>({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);

    const signInSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        try {
            setLoading(true);
            e.preventDefault();
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,inputValues);
            const jwt = res.data;
            localStorage.setItem("token",`Bearer ${jwt.token}`);
            // navigate("/blogs")
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch (err:any) {
            console.log(err.response.data.error);
        }finally{
            setLoading(false);
        }
    }

    return <>
        <section className=" min-h-screen flex flex-col justify-center">
                <div className="absolute inset-0 pointer-events-none">                    
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] opacity-90"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100%_40px] bg-[position:center] opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="bg-gradient-to-t from-white to-transparent h-6 w-full"></div>
                </div>
            <div className="mx-auto px-4 z-10">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-6 min-w-[400px]">
                        <form onSubmit={signInSubmit} className="space-y-4 w-full">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input id="email" type="email" className="border-[1px] rounded-md px-3 text-base py-2 w-full" placeholder="your@email.com" required onChange={(e)=>{
                                        setInputValues((prev)=>({...prev,email:e.target.value}));
                                    }}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <input id="password" type="password" className="border-[1px] rounded-md px-2 text-base px-3 text-base py-2 w-full" placeholder="••••••••" required title="Password must be 8 characters long" pattern="^.{8,}$" onChange={(e)=>{
                                        setInputValues((prev)=>({...prev,password:e.target.value}));
                                    }} />
                                </div>
                                {
                                    error && <div>
                                        <p>{error}</p>
                                    </div>
                                }
                            </div>
                            <div>
                                <button type="submit" className="text-white bg-black rounded-md px-2 w-full py-[7px] hover:bg-black/80">{loading?"Loading...":"Sign In"}</button>
                            </div>
                            <div className="text-black hover:underline text-sm text-center">
                                <Link to={"/signup"}>Don't have an account <span className="font-medium">Register Now!</span></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Signin;