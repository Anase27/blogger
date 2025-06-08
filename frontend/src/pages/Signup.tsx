import { ChangeEvent, useEffect, useState } from "react";
import { SignupInput } from "@anase/medium-common";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { Link } from "react-router-dom";
import useValidateUser from "../hooks/useValidateUser";
import { useNavigate } from "react-router-dom";

function Signup() {
  // const passMatch = useRef<HTMLDivElement>(null);
  // useEffect(()=>{
  //   useValidateUser()
  // })
  const[disabled, setDisabled] = useState(false);
  const isLoggedIn = useValidateUser()
  console.log(isLoggedIn);
  const navigate = useNavigate();
  if(isLoggedIn) navigate("/");

  const submitSignUp = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    // console.log(inputValues);
    setDisabled((prev)=>!prev);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,inputValues);
      console.log(res);
      const jwt = res.data;
      // console.log(jwt.token);
      localStorage.setItem("token", `Bearer ${jwt.token}`);

      navigate("/", { replace: true });

      
    } catch (error) {
      console.log(error);
    }
    setDisabled((prev)=>!prev);


  }

  const [confPass,setConfPass] = useState("");
  const [inputValues, setInputValues] = useState<SignupInput>({
    email:"",
    password:"",
    name:""
  });
  const[error,setError] = useState("");

  useEffect(() => {
    if (inputValues.password.length>0 && confPass.length>0) {
      if (inputValues.password === confPass) {
        setError("");
        setDisabled(false)
      } else {
        setError("Your password doesn't match");
        setDisabled(true)
      }
    }
  }, [inputValues.password, confPass]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10">
      <div className="absolute inset-0 pointer-events-none">                    
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] opacity-90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100%_40px] bg-[position:center] opacity-90"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-gradient-to-t from-white to-transparent h-6 w-full"></div>
      </div>

      <div className="mx-auto px-4 z-10">
        <div className="max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-gray-600 mt-2">Unlock access to <span className="text-black font-medium">amazing</span> community and grow <span className="text-black font-medium">10x..</span></p>
          </div>
          <div className=" bg-white/80 p-6 backdrop-blur-sm rounded-xl shadow-md max-w-[400px]">
            <form onSubmit={submitSignUp} className="w-full space-y-4">
              <div className="signupInputs flex flex-col text-black">
                <div className="space-y-3">
                  <div className="relative">
                    <label htmlFor="signupUser" className="block text-sm text-gray-700 mb-1 font-medium">Username</label>
                    <input className="border-[1px] rounded-md px-3 py-2 py-1 text-base w-full" type="text" name="username" id="signupUser" placeholder="Username" required onChange={(e)=>{
                      setInputValues({
                        ...inputValues,
                        name:e.target.value
                      })}}/>
                  </div>
                  <div>
                    <label htmlFor="signupMail" className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
                    <input className="border-[1px] rounded-md px-3 py-2 text-base w-full" type="email" name="email" id="signupMail" placeholder="your@mail.com" required onChange={(e)=>{
                      setInputValues({
                        ...inputValues,
                        email:e.target.value
                      })
                    }}/>
                  </div>
                  <div>
                    <label htmlFor="signupPass" className="block text-sm text-gray-700 mb-1 font-medium">Password</label>
                    <input className="border-[1px] rounded-md px-3 py-2 text-base w-full" type="password" name="password" id="signupPass" placeholder="Password" title="Password must have 8 characters" pattern="^.{8,}$" required onChange={(e)=>{
                      setInputValues({
                        ...inputValues,
                        password:e.target.value
                      })
                    }}/>
                  </div>
                  <div className="relative">
                    <label htmlFor="signupConfPass" className="block text-sm text-gray-700 mb-1 font-medium">Confirm Password</label>
                    <input className="border-[1px] rounded-md px-3 py-2 text-base w-full" type="password" name="Confpassword" id="signupConfPass" placeholder="Confirm Password" required onChange={(e)=>{
                      setConfPass(()=>e.target.value);
                    }}/>
                    {error && inputValues.password.length>0 && confPass.length>0 && <div className="text-red-500 absolute b-0 text-sm">
                      <p>{error}</p>
                    </div>}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button type="submit" className="text-white bg-black rounded-md mt-2 px-2 w-full py-[7px] hover:bg-black/80" disabled={disabled}>{disabled ?"Loading...":"Submit"}</button>
                </div>
              <div className="text-sm hover:underline text-center">
                <Link to={"/signin"}>Already have an acccount? <span className="font-medium">Login</span></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InputTypes{
  placeholder: string,
  onChange: (e:ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  label?: string,
  id?: string,
  name?: string
}

function Inputs({type,placeholder,onChange,label,id,name}: InputTypes){
  return <div>
    <input type={type || 'text'} placeholder={placeholder} onChange={onChange} className="text-black"/>
  </div>
}
export default Signup