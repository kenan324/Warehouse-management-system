"use client"
import ItemTable from "@/components/table/ItemTable";
import Button from "@/components/ui/Button/Button";
import Searchbar from "@/components/ui/Searchbar/Searchbar";
import { PlusIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { Item } from "@/type/item-types";


export default function StockItems({ items }: { items: Item[] }) {
    const router  = useRouter();


    return (
        <div className="flex-1 flex flex-col p-6 space-y-2 min-h-full">
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
            <ItemTable tableItem={items}/>
        </div>
    );
}