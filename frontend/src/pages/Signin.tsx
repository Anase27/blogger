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
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={signInSubmit} className="p-2">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col">
                        <input type="email" placeholder="Email" required onChange={(e)=>{
                            setInputValues((prev)=>({...prev,email:e.target.value}));
                        }}/>
                        <input type="password" placeholder="Password" required title="Password must be 8 characters long" pattern="^.{8,}$" onChange={(e)=>{
                            setInputValues((prev)=>({...prev,password:e.target.value}));
                        }} />
                        {
                            error && <div>
                                <p>{error}</p>
                            </div>
                        }
                    </div>
                    <div>
                        <button type="submit" className="text-white">{loading?"Loading...":"Submit"}</button>
                    </div>
                </div>
                <div className="text-white">
                    <Link to={"/signup"}>Don't have an account <span className="text-blue-600">Register Now!</span></Link>
                </div>
            </form>
        </div>
    </>
}

export default Signin;