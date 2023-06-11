"use client";
import React, { useRef } from "react";
import axios from "axios";
import {useRouter } from "next/navigation";
type Props = {};
const BASE_URL = 'http://localhost:4000'
//this login controller makes use of axios.post()
//credentials true
axios.defaults.withCredentials = true;

export default function LoginForm({}: Props) {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(emailRef.current?.value);
    // console.log(passwordRef.current?.value);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    try {
    
      await axios.post(BASE_URL+'/login', {email, password})
            .then((res)=>{
              localStorage.setItem("token", res.data.token)
              localStorage.setItem("user", res.data.user)
              router.push('/dashboard')
              // console.log(res)
            }).catch((err)=>console.log(err.message))
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          className="px-2 py-1 border border-black "
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          className="px-2 py-1 border border-black "
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="border border-black px-2 py-1 rounded bg-blue-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
