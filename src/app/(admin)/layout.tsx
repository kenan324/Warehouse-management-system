// app/(admin)/layout.tsx
"use client";

import React from "react";
import { useSidebar } from "../../context/SidebarProvider";
import AppSidebar from "@/layout/AppSidebar";
import AppHeader from "@/layout/AppHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, isHovered } = useSidebar();
  
  const toggleSidebar = 
    isOpen || isHovered 
      ? "lg:ml-72" 
      : "lg:ml-22.5"
      
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out
          ${toggleSidebar}`}
      >
        <AppHeader />
        <main className="min-w-0 mt-16 flex-1">{children}</main>
      </div>
    </div>
  );
}