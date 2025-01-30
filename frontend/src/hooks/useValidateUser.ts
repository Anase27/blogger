import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";

const useValidateUser = ()=>{
    const [isVerified,setIsVerified] = useState<boolean | null>(null);

    const validate =async ()=>{
        const token = localStorage.getItem("token");
        if(!token){
            setIsVerified(false);
            return;
        }
        
        try{
            const res = await axios.get(`http://127.0.0.1:8787/api/v1/user/validate`,{headers:{'Authorization': `Bearer ${token.split(" ").pop()}`}});
            if(res.status == 200) setIsVerified(true);
            else setIsVerified(false);
        }catch{
            setIsVerified(false)
        }


    }

    useEffect(()=>{
        validate();
        
        const handleStorageChange = (e:StorageEvent)=>{
            if(e.key == 'token'){
                validate()
            }
        }
        window.addEventListener("storage",handleStorageChange);

        return () => window.removeEventListener("storage",handleStorageChange);
    },[]);

    return isVerified;

    
}

export default useValidateUser;