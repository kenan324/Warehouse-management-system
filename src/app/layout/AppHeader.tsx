"use client"
import React, {useState} from "react";
import { useSidebar } from "../context/SidebarProvider";


const AppHeader = () => {

    const { toggleSidebar } = useSidebar(); 
    return (
        <main>
            <div className="fixed top-0 left-0 w-full h-16 bg-white border-b z-50">
                {/*"navbar"*/}
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="flex items-center h-16 bg-white border-b border-gray-200">
                        <div className="shrink-0 m-2">
                            <a href="#" className="flex items-center space-x-2">
                                <img src="https://img.freepik.com/premium-vector/k-word-logo-logo-design_622874-26.jpg?w=740" 
                                alt="Logo" 
                                className="h-10 w-10 rounded-full object-cover" />
                                <span className="font-bold text-x1 text-gray-800">
                                    Brand Name
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center px-4 ml-18">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-700"
                            onClick={toggleSidebar}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <input type="text" className="mx-4 w-full border rounded-md px-4 py-2" placeholder="Search"/>
                        </div>
                        <div className="flex items-center pr-4 ml-auto">
                            <button
                            className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AppHeader