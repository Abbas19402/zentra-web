'use client'

import React, {useEffect, useState} from 'react'
import type { SidebarItem, SidebarType } from '../types'
import { SidebarMenu } from '../constants/SidebarMenu'
import { ChevronToggleIcon } from './ui/Icons'
import { useRouter, usePathname  } from 'next/navigation'



const SidebarItem: React.FC<Partial<Omit<SidebarItem,'type'>>> = ({ icon, label, child, hasChild, route }) => {
  const pathname = usePathname()
    const router = useRouter()
    const [isChildSidebarOpen, setIsChildSidebarOpen] = useState<boolean>(false)

    function handleSidebarItemClick(e: any) {
        e.stopPropagation()
        if(hasChild && !route) {
            if(isChildSidebarOpen) setIsChildSidebarOpen(false)
            else setIsChildSidebarOpen(true)
            return;
        }
        if(route && !hasChild) router.push(route) 
    }
    const isActive = route === pathname
    return (
       <div
  onClick={(e: any) => handleSidebarItemClick(e)}
  className="group w-full flex flex-col select-none"
>
  {/* Top-level item */}
  <div
    className={` flex items-center space-x-3
      w-full h-11 px-4 py-2
      rounded-xl transition-all duration-200
      text-black
      hover:bg-gray-100
      cursor-pointer ${isActive ? ' bg-gray-200' : 'bg-white'}`}>
    {icon}
    <span className="whitespace-nowrap text-sm tracking-wide font-medium flex-1">
      {label}
    </span>

  </div>
</div>

    )
}

const Sidebar = () => {
    return (
    <aside className="w-full h-[calc(100vh-64px)] px-4 py-6 
                      bg-white
                     backdrop-blur-md  shadow-lg
                     flex flex-col justify-between ">
    <div className="flex flex-col space-y-2 w-full">
      {SidebarMenu.map((item) => (
        <SidebarItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          child={item.hasChild ? item.child : []}
          hasChild={item.hasChild}
          route={item.route}
        />
      ))}
    </div>
  </aside>
    )
}

export default Sidebar