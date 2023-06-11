'use client'

import React from 'react'
import axios from 'axios'
type Props = {}
const BASE_URL = 'http://localhost:4000'
axios.defaults.withCredentials = true;


function LogoutForm({}: Props) {
    const handleLogout = async () =>{
        await axios.get(BASE_URL+'/logout')
        .then(res=>{
            localStorage.removeItem('token')
            console.log(res)
        })
        // console.log('logout button clicked');
      }
  return (
    <div className='h-[100%] w-[100%] flex justify-center items-center'>
      <button 
        className='px-2 py-3 bg-black text-white'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default LogoutForm