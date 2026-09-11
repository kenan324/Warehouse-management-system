

import PageBreadcrumbNav from "@/components/components-cards/PageBreadcrumbNav";
import { itemService } from "@/service/ItemService";
import CreateItems from "@/components/other/create-Items/CreateItems";
import StockItems from "@/components/other/stock-Items/StockItems";

export default async function Stock() {
   
    const items = await itemService.list();

    const itemsExist = () => {
        return items.length > 0 ;
    };

    return (
        <div className="flex-1 flex flex-col p-6 space-y-2 min-h-full">
            <PageBreadcrumbNav pageTitle="Inventory" path="inventory/stock-items" />
            {itemsExist() ? ( 
                <>
                <StockItems items={items}/>
                </>
            ): (
                <CreateItems/>
            )}
        </div>
    )
        
}