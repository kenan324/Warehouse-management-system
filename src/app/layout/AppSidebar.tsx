"use client"

import React from 'react'
import { useSidebar } from '../context/SidebarProvider'

const AppSidebar = () => {

    const { isOpen, isHovered, toggleSidebar, setIsHovered } = useSidebar();
    return (
        <aside
        className={`
            fixed flex flex-col top-16 left-0 h-screen bg-gray-800 z-50 lg:mt-0 px-8 overflow-y-aut border-gray-800 text-white
            transform transform-all duration-300 ease-in-out
            ${isOpen
                ? "w-58.5"
                : isHovered
                ? "w-58.5"
                : "w-22.5"
            }
        `}
        onMouseEnter={() => !isOpen && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex flex-col overflow-y-auto duration-300 ease-linear'>
                <nav className='mb-4'>
                    <div className='flex flex-col gap-4 overflow-hidden'>
                        <h2 className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                            !isOpen && !isHovered
                                ? "lg:justify-center"
                                : "justify-start"
                            }`}
                        >
                            { isOpen || isHovered ? (
                                "menu"
                            ) : (
                                " "
                            )}
                        </h2>
                            { isOpen || isHovered ? (
                                "Order"
                            ) : (
                                " "
                            )}
                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default AppSidebar