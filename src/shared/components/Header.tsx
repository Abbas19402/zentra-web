'use client'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    const hideGoLiveButton = pathname.startsWith("/go-live");


    const router = useRouter()
    return (
        <header className=" bg-white w-full flex justify-evenly items-center p-4 gap-4 h-16 bg-white">
            {/* /Icon */}
            <div className="flex-1">
  <h1 className="text-4xl font-extrabold tracking-tight text-transparent ">
    <span className="text-gray-800">StreaMeyo</span>
  </h1>
</div>
 
            <SignedOut>
                <SignInButton>Login</SignInButton>
                <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">Register</button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                {!hideGoLiveButton &&
                <button  className='text-gray-800 border border-1px border-gray-800 rounded-md p-1 hover:bg-gray-800 hover:text-white' onClick={() => router.push('go-live')}>Go Live</button>
}
                <UserButton />
            </SignedIn>
        </header>
    )
}

export default Header