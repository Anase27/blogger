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
        const payload = {
            token
        }

        try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/validate`,payload);

            setIsVerified(res.data.signed)
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