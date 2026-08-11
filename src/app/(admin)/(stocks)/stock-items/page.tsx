"use client"

import PageBreadcrumbNav from "@/app/components/breadcrumbnav/breadcrumbNav";
import Searchbar from "@/app/components/searchbar/searchbar";
import Button from "@/app/components/ui/Button/Button";
import { useRouter } from "next/navigation";


export default function Stock() {
    const router  = useRouter();


    return (
        
        <div className="flex-1 p-6 space-y-2">
            <PageBreadcrumbNav pageTitle="Inventory" path="inventory/stock-items" />
            <div className="flex items-center justify-between mt-4 p-6 bg-white rounded-lg shadow-md">
                <Searchbar />
                <Button size="sm" variant="outline" className="flex items-center"
                onClick={() => router.push("/add-item")}
                >
                    Add Item
                </Button>
            </div>
        </div>
    );
}