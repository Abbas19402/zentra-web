'use client'

import React, {useEffect, useState} from 'react'
import type { SidebarItem, SidebarType } from '../types'
import { SidebarMenu } from '../constants/SidebarMenu'
import { ChevronToggleIcon } from './ui/Icons'
import { useRouter } from 'next/navigation'

const SidebarItem: React.FC<Partial<Omit<SidebarItem,'type'>>> = ({ icon, label, child, hasChild, route }) => {
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
    
    return (
       <div
  onClick={(e: any) => handleSidebarItemClick(e)}
  className="group w-full flex flex-col select-none"
>
  {/* Top-level item */}
  <div
    className="
      flex items-center space-x-3
      w-full h-11 px-4 py-2
      rounded-xl transition-all duration-200
      bg-gray-800/40 hover:bg-sky-500/20
      text-gray-300 hover:text-sky-300
      cursor-pointer
    "
  >
    {icon}
    <span className="whitespace-nowrap text-sm tracking-wide font-medium flex-1">
      {label}
    </span>

    {hasChild && (
      <ChevronToggleIcon
        className="h-5 w-5 fill-gray-400 group-hover:fill-sky-300 transition-all"
        isOpen={isChildSidebarOpen}
      />
    )}
  </div>

  {/* Children */}
  {hasChild && isChildSidebarOpen && (
    <div className="ml-6 mt-2 flex flex-col space-y-2">
      {child?.map((item) => (
        <SidebarItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          route={item.route}
        />
      ))}
    </div>
  )}
</div>

    )
}

const Sidebar = () => {
    return (
    <aside className="w-full h-[calc(100vh-64px)] px-4 py-6 
                     bg-gradient-to-b from-gray-900/80 via-gray-950/90 to-black/90 
                     backdrop-blur-md border-r border-gray-800 shadow-lg
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