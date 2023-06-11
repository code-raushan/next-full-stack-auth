import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav>
        <div className='flex flex-row justify-center items-center gap-4 p-4 bg-black text-white mb-10'>
           <Link href={'/signup'}>
                Signup
           </Link> 
           <Link href={'/login'}>
                Login
           </Link> 
           <Link href={'/dashboard'}>
                Dashboard
           </Link> 
           <Link href={'/logout'}>
                Logout
           </Link> 
        </div>
    </nav>
  )
}

export default Navbar