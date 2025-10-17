'use client'

import React, {useEffect, useState} from 'react'
import { SidebarItem, SidebarType } from '../types'
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
        <div className='w-full flex flex-col hover:cursor-pointer hover:text-black group' onClick={(e: any) => handleSidebarItemClick(e)}>
            <div className="
            flex justify-start items-center space-x-4 
            w-[80%] h-10 py-2 px-5 
            bg-slate-100
            rounded-xl
            ">
                {icon}
                <span className="whitespace-nowrap text-sm tracking-wide font-medium text-gray-600 select-none">{label}</span>
                {hasChild && <div className="flex-1"><ChevronToggleIcon className='h-5 w-5 fill-gray-600 group-hover:fill-black float-right' isOpen={isChildSidebarOpen}/></div>}
            </div>
            {(hasChild && isChildSidebarOpen) && <div className={`ml-6 flex flex-col justify-end items-center space-y-2 w-full ${isChildSidebarOpen ? 'mt-4' : 'mt-0'}`}>
                {isChildSidebarOpen && child?.map(item => <SidebarItem 
                    key={item.key}
                    icon={item.icon} 
                    label={item.label}
                    route={item.route}
                />)}
                </div>}
        </div>
    )
}

const Sidebar = () => {
    return (
        <div className='max-w-64 w-full h-[calc(100vh-64px)] px-5 sticky top-0 left-0'>
            <div className="flex flex-col justify-between items-center space-y-4">
                {SidebarMenu.map(item => <SidebarItem 
                    key={item.key}
                    icon={item.icon} 
                    label={item.label}
                    child={item.hasChild ? item.child : []}
                    hasChild={item.hasChild}
                    route={item.route}
                />)}
            </div>
        </div>
    )
}

export default Sidebar