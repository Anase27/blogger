import { ChangeEvent, useEffect, useState } from "react";
import { SignupInput } from "@anase/medium-common";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { Link } from "react-router-dom";

function Signup() {
  // const passMatch = useRef<HTMLDivElement>(null);
  const[loading, setLoading] = useState(false);

  const submitSignUp = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(inputValues);
    setLoading((prev)=>!prev);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,inputValues);
      const jwt = res.data;
      console.log(jwt.token);
      localStorage.setItem("token", `Bearer ${jwt.token}`);

      
    } catch (error) {
      console.log(error);
    }
    setLoading((prev)=>!prev);


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
      } else {
        setError("Your password doesn't match");
      }
    }
  }, [inputValues.password, confPass]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div>
        <form onSubmit={submitSignUp}>
          <div>
            <p>Signup to unlock access to <span className="highlighted-font">amazing</span> community and grow <span className="highlighted-font">10x</span> in x time.</p>
          </div>

          <div className="signupInputs flex flex-col text-black">
            <input type="text" name="username" id="signupUser" placeholder="Username" required onChange={(e)=>{
              setInputValues({
                ...inputValues,
                name:e.target.value
              })}}/>
            <input type="email" name="email" id="signupMail" placeholder="Email" required onChange={(e)=>{
              setInputValues({
                ...inputValues,
                email:e.target.value
              })
            }}/>
            <input type="password" name="password" id="signupPass" placeholder="Password" title="Password must have 8 characters" pattern="^.{8,}$" required onChange={(e)=>{
              setInputValues({
                ...inputValues,
                password:e.target.value
              })
            }}/>
            <input type="password" name="Confpassword" id="signupConfPass" placeholder="Confirm Password" required onChange={(e)=>{
              setConfPass(()=>e.target.value);
            }}/>
            {/* <Inputs type="text" placeholder="Username" onChange={(e)=>{
              setInputValues({
                ...inputValues,
                name:e.target.value
              })
            }} /> */}
            {/* <Inputs type="email" placeholder="Email" onChange={(e)=>{
              setInputValues({
                ...inputValues,
                email:e.target.value
              })
            }} />
            <Inputs type="password" placeholder="Password" onChange={(e)=>{
              
              setInputValues({
                ...inputValues,
                password:e.target.value
              })
            }} />
            <Inputs type="password" placeholder="Confirm Password" onChange={(e)=>{
              setConfPass(()=>e.target.value);
            }} /> */}

            {error && inputValues.password.length>0 && confPass.length>0 && <div className="text-red-500">
              <p>{error}</p>
            </div>}

            <button type="submit" className="text-white" disabled={loading}>{loading ?"Loading...":"Submit"}</button>
          </div>
          <div>
            <Link to={"/signin"}>Already have an acccount <span className="text-blue-600">Login</span></Link>
          </div>
        </form>
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