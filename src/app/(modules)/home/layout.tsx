import React from 'react'

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

export default HomeLayout