"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSidebar } from '@/context/SidebarProvider';
import { ChevronDownIcon, EmployeeIcon, GridIcon, HorizontaLIcon, InventoryIcon, OrderIcon, ShipmentIcon } from '@/icons';
import { spawn } from 'child_process';
import Link from 'next/link';
import path from 'path';
import { usePathname } from 'next/navigation';

type NavItems = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string;}[];
};

const navItems: NavItems[] = [
    {
        icon: <GridIcon />,
        name: "Dashboard",
        path: "/dashboard"
    },
    {
        icon: <InventoryIcon />,
        name: "Inventory",
        subItems: [{name: "Stock", path: "/stock"}]
    },
    {
        icon: <OrderIcon />,
        name: "Order",
        path: "/order"
    },
    {
        icon: <ShipmentIcon />,
        name: "Shipment",
        path: "/shipment"
    },
    {
        icon: <EmployeeIcon />,
        name: "Employe",
        path: "/employe"
    },
]

const AppSidebar = () => {

    const { isOpen, isHovered, toggleSidebar, setIsHovered } = useSidebar();
    const pathname = usePathname();

    const renderMenuItems = (
        navItems: NavItems[]
    ) => (
        <ul className='flex flex-col gap-4'>
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                        onClick={() => handleSubmenuToggle(index)}
                        className={`
                            flex items-center gap-2 px-2 py-2 w-full cursor-pointer
                            ${
                                openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            }${
                                !isOpen && !isHovered
                                    ? "lg:justify-center"
                                    : "lg:justify-start"
                        }`}
                        >
                            <span
                            className={` ${
                                openSubmenu?.index === index
                                    ? "menu-item-icon-active"
                                    : "menu-item-icon-inactive"
                            }`}
                            >
                                {nav.icon}
                            </span>
                                {(isOpen || isHovered) && (
                                    <span className={`menu-item-text`}>{nav.name}</span>
                                )}
                                {(isOpen || isHovered) && (
                                    <ChevronDownIcon 
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.index === index
                                            ? "rotate-180 text-brand-500"
                                            : ""
                                    }`}
                                    />
                                )}
                        </button>
                    ) : (
                    nav.path && (
                        <Link href={nav.path}
                        className={`flex items-center gap-2 px-2 py-2 ${
                            isActive(nav.path) 
                                ? "menu-item-active" 
                                : "menu-item-inactive"
                            }
                        cursor-pointer ${
                            !isOpen && !isHovered
                            ? "lg:justify-center"
                            : "lg:justify-start"
                        }`}
                        >
                            <span
                            className={`${
                                isActive(nav.path)
                                    ? "menu-item-icon-active"
                                    : "menu-item-icon-inactive"
                            }`}
                            >
                                {nav.icon}
                            </span>
                            {(isOpen || isHovered) && (
                                <span className={`menu-item-text`}>{nav.name}</span>
                            )}
                        </Link>
                        )
                    )}
                    {nav.subItems && (isOpen ||isHovered) && (
                        <div
                        ref={(el) => {
                            subMenuReft.current[`${index}`] = el;
                        }}
                        className='overflow-hidden tracking-all duration-300'
                        style={{
                            height:
                            openSubmenu?.index === index
                                ? `${subMenuHeight[`${index}`]}px`
                                : "0px"
                        }}
                        >
                            <ul className='mt-w space-y-1 ml-9'>
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                        href={subItem.path}
                                        className={`menu-dropdown-item ${
                                            isActive(subItem.path)
                                                ? "menu-dropdown-item-active"
                                                : "menu-dropdown-item-inactive"
                                        }`}
                                        >
                                            {subItem.name}
                                            <span className='flex items-center gap-1 ml-auto'>
                                                <span
                                                className={`ml-auto ${
                                                    isActive(subItem.path)
                                                        ? "menu-dropdown-badge-active"
                                                        : "menu-dropdown-badge-inactive"
                                                } menu-dropdown-badge `}></span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    )

    const [openSubmenu, setOpenSubmenu] = useState<{
         index: number
    } | null>(null);

    const isActive = useCallback((path: string) => path === pathname, [pathname])

    const subMenuReft = useRef<Record<string, HTMLDivElement | null>>({})

    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    )

    const handleSubmenuToggle = (
        index: number
    ) => {
        setOpenSubmenu((prevopenSubmenu) => {
            if (
                prevopenSubmenu &&
                prevopenSubmenu.index === index
            ) {
                return null
            }
            return {index};
        })
    }

    useEffect(() => {
        let submenuMatched = false;
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({index});
                        submenuMatched = true;
                    }
                });
            }
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.index}`;
            if (subMenuReft.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuReft.current[key]?.scrollHeight || 0,
                }))
            }
        }
    }, [openSubmenu]);

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
            <div className='flex flex-col overflow-y-hidden duration-300 ease-linear no-scrollbar'>
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
                                <HorizontaLIcon className="w-6 h-6"
                                />
                            )}
                        </h2>
                        {renderMenuItems(navItems)}
                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default AppSidebar