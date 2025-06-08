import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";

const useValidateUser = ()=>{
    const [isVerified,setIsVerified] = useState<boolean | null>(null);

    useEffect(()=>{
        const validate =async ()=>{
            const token = localStorage.getItem("token");
            if(!token){
                setIsVerified(false);
                return;
            }
            
            try{
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/validate`,{
                    headers:{
                        'Authorization': `Bearer ${token.split(" ").pop()}`
                    }
                });
                setIsVerified(res.status == 200);
                
            }catch{
                setIsVerified(false)
            }


        }

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