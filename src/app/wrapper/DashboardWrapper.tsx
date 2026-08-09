"use client"

import React from 'react'
import { useSidebar } from '../context/SidebarProvider';
import AppHeader from '../layout/AppHeader';

const DashboardWrapper: React.FC<{children : React.ReactNode}> = ({children}) => {
    const { isOpen, isHovered } = useSidebar();
  
    return (
    <div
    className={`flex flex-col flex-1 ${
        isOpen ||isHovered
            ? "lg:ml-72"
            : "lg:ml-22.5"
    }transition-all duration-300 ease-in-out`}
    >
        <AppHeader />
        <main className='flex-1'>{children}</main>
    </div>
  )
}

export default DashboardWrapper;