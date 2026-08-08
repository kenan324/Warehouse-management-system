"use client"

import React, { ReactNode, createContext, useContext, useState } from 'react'


type SidebarContextType = {
  isOpen: boolean;
  isHovered: boolean;
  toggleSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined> (undefined)

export function useSidebar() {
  const context = useContext(SidebarContext);
  if(!context){
    throw new Error ("useSidebar must be used in SidebarProvider")
  }
  return context;
}

export function SidebarProvider({children}: {children: ReactNode}) {
  const [isOpen, setIsOpened] = useState(true);
  const [isHovered, setIsHovered] = useState(true);

  const toggleSidebar = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <SidebarContext.Provider    
    value={{
      isHovered,
      isOpen,
      setIsHovered,
      toggleSidebar
    }}
    >
      {children}
    </SidebarContext.Provider>
 
  );
}
