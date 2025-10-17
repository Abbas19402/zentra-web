import React from 'react'
import { ClerkProvider } from "@clerk/nextjs"

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}

export default Providers