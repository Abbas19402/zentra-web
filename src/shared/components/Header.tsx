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
        <header className="w-full flex justify-evenly items-center p-4 gap-4 h-16 bg-white">
            {/* /Icon */}
            <div className='flex-1'>
                <span className="text-2xl font-thin text-sky-800">ZENTRA</span>
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