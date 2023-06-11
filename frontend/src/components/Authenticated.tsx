'use client'
// import { getCookies } from "cookies-next";
import cookieCutter from 'cookie-cutter'
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

function Authenticated({children, redirectTo}:{
    children: React.ReactElement,
    redirectTo: string,
}){
    const router = useRouter()
    const [isTokenAvailable, setIsTokenAvailable]=useState<boolean>(false)
    useEffect(()=>{
        if(typeof localStorage !==undefined){
            setIsTokenAvailable((prev)=>!prev)
        }
    }, [])
    if(isTokenAvailable){
        if(localStorage.getItem('token')){
            // console.log(getCookie('authToken', {path: '/'}))
            cookieCutter.get('authToken')
            return <>{children}</>
        }else{
            router.replace(redirectTo)
            return <></>
        }
        
    }else{
        return <>This is a protected Route</>
    }

    
    
}

export default Authenticated;
