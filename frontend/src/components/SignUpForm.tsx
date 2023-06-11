"use client";
import React, { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};
const BASE_URL = "http://localhost:4000";

export default function SignUpForm({}: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      // await axios.post(`${BASE_URL}/signup`, {name, email, password})
      //     .then((res)=>{
      //       router.push('/dashboard')
      //       return res
      //     })
      //     .catch((error)=>{
      //       console.log(error.message)
      //       router.push('/signup')
      //     })
      // console.log('handled');
      await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("user", JSON.stringify(res.data.user));
          router.push("/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="email">Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          autoComplete="off"
          className="px-2 py-1 border border-black "
        />
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
