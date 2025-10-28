'use client'

import React, {useEffect, useState} from 'react'
import type { SidebarItem, SidebarType } from '../types'
import { SidebarMenu } from '../constants/SidebarMenu'
import { ChevronToggleIcon } from './ui/Icons'
import { useRouter } from 'next/navigation'

const FootNavbarItem: React.FC<Partial<Omit<SidebarItem,'type'>>> = ({ icon, label, child, hasChild, route }) => {
    const router = useRouter()
   // const [isChildSidebarOpen, setIsChildSidebarOpen] = useState<boolean>(false)

    function handleSidebarItemClick(e: any) {
        e.stopPropagation()
     //   if(hasChild && !route) {
     //       if(isChildSidebarOpen) setIsChildSidebarOpen(false)
     //       else setIsChildSidebarOpen(true)
     //       return;
     //   }
        if(route && !hasChild) router.push(route) 
    }
    
    return (
       <div
  onClick={(e: any) => handleSidebarItemClick(e)}
  className="group w-full select-none" 
>
  {/* Top-level item */}
  <div
    className="
      flex flex-col items-center 
      bg-gray-800/40 hover:bg-sky-500/20
      text-gray-300 hover:text-sky-300
      cursor-pointer py-2"
  >
    {icon}
    <span className="whitespace-nowrap text-xs  font-small pt-1 ">
      {label}
    </span>
  </div>
</div>

    )
}

const Footnavbar = () => {
    return (
    <aside className="w-full 
                     bg-gradient-to-b from-gray-900/80 via-gray-950/90 to-black/90 
                     backdrop-blur-md border-r border-gray-800 shadow-lg
                     flex justify-between bg-blue-800">
    <div className="flex space-y-2 w-full">
      {SidebarMenu.map((item) => (
        <FootNavbarItem
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

export default Footnavbar