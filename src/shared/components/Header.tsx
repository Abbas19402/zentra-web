'use client'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md w-full flex justify-evenly items-center p-4 gap-4 h-16 bg-white">
            {/* /Icon */}
            <div className="flex-1">
  <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md">
    Strea<span className="text-white">Meyo</span>
  </h1>
</div>

            <SignedOut>
                <SignInButton>Login</SignInButton>
                <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">Register</button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>   
                <UserButton />
            </SignedIn>
        </header>
    )
}

export default Header