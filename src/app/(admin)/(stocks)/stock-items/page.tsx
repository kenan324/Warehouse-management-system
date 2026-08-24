"use client"

import PageBreadcrumbNav from "@/components/components-cards/PageBreadcrumbNav";
import Searchbar from "@/components/ui/Searchbar/Searchbar";
import ItemTable from "@/components/table/Item-table";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@/icons";
import { useEffect, useState } from "react";
import { itemService } from "@/service/ItemService";
import { Item } from "@/type/item-types";
import CreateItems from "@/components/other/create-Items/CreateItems";

export default function Stock() {
    const router  = useRouter();


    const [items, setItems] = useState<Item[]>([]);

    const itemsExist = () => {
        return items.length > 0 ;
    };

    useEffect(()=> {
        const loadItems = async () => {
            const items = await itemService.list();
            setItems(items);
        };
        loadItems();
    }, [])
    return (
        
        <div className="flex-1 p-6 space-y-2">
            <PageBreadcrumbNav pageTitle="Inventory" path="inventory/stock-items" />
            <div className="flex items-center justify-between mt-4 p-6 bg-white rounded-lg shadow-md">
                <Searchbar />
                <Button size="sm" variant="primary" 
                className={`flex items-center
              bg-[#0A66C2]  text-white hover:bg-[#16437E] focus:bg-[#16437E] active:bg-[#09223b] active:text-white/70 
                `}
                startIcon={ <PlusIcon className="w-3 h-3"/> }
                onClick={() => router.push("/add-item")}
                >
                    Add Item
                </Button>
            </div>
            {itemsExist() ? 
                (
                <ItemTable tableItem={items}/>
            ) : (
                <CreateItems/>
            )}
        </div>
    );
}