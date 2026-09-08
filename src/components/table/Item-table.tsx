import Image from "next/image";
import {Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/Table/Table";
import { Item } from "@/type/item-types";
import Button from "../ui/Button/Button";
import { BinIcon, PlusIcon } from "@/icons";
import { useEffect, useState } from "react";
import { deleteItem } from "@/action/item-action";
import { itemService } from "@/service/ItemService";
import { useRouter } from "next/navigation";

const columns = [
    {
        key: "name",
        label: "Name"
    },
    {
        key: "sku",
        label: "SKU"
    },
    {
        key: "unit",
        label: "Unit"
    },
    {
        key: "itemMasterStatus",
        label: "Item Master Status"
    },
        
    {
        key: "upc",
        label: "UPC"
    },
    {
        key: "enm",
        label: "ENM"
    },
    /*
    {
        key: "dimension",
        label: "Dimension"
    },
    {
        key: "Vendor",
        label: "Vendor"
    },
        {
        key: "Brand",
        label: "Brand"
    },
        {
        key: "Weight",
        label: "Weight"
    },
    //*/
]

export default function ItemTable({tableItem}: {tableItem : Item[]}) {

    const [items, setItems] = useState<Item[]>(tableItem);
    const router = useRouter();
    const handleDelete = async (id: string) => {
        const prevItems = items;

        setItems(prev => prev.filter(item => item.id !== id));
        const result = await deleteItem(id);
        if(!result.success){
           setItems(prevItems)
        }
    };

    const handleEdit= (id: string) => {
        router.push(`/edit/${id}`)
    };

    useEffect(()=> {
       setItems(tableItem)
    }, [tableItem])
    return(
        <div className="overflow-hidden rounded-x1 border border-gray-200">
            <Table className="max-w-full overflow-x-auto">
                <TableHeader className="border-b border-gray-10">
                    <TableRow>
                        {columns.map((columns) => (
                            <TableCell isHeader key={columns.key}
                            className="first:text-left border-b-2 border-gray-200 bg-gray-50 px-3 py-2.5 font-semibold text-gray"
                            >
                                {columns.label}
                            </TableCell>
                        ))}
                        <TableCell isHeader className="first:text-left border-b-2 border-gray-200 bg-gray-50 px-3 py-2.5 font-semibold text-gray">
                            Option
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} className="group hover:bg-gray-100">
                            <TableCell className="border-b border-gray-100 px-3 py-2.5">
                                <div className="flex items-center">
                                    <Image
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                                    alt= "test Image"
                                    width={50}
                                    height={50}
                                    className="mr-4 rounded-1 border border-gray-200 bg-white object-contain"
                                    ></Image>
                                    <span>{item.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="h-10  border-b border-gray-100 px-3 py-2.5">
                                {item.sku}
                            </TableCell>
                            <TableCell className="h-10  border-b border-gray-100 px-3 py-2.5">
                                {item.unit}
                            </TableCell>
                            <TableCell className="h-10  border-b border-gray-100 px-3 py-2.5">
                                {item.itemMasterStatus}
                            </TableCell>
                            <TableCell className="h-10  border-b border-gray-100 px-3 py-2.5">
                                {item.upc}
                            </TableCell>
                            <TableCell className="h-10  border-b border-gray-100 px-3 py-2.5">
                                {item.enm}
                            </TableCell>
                            {/*
                            <TableCell className="h-10 border-b border-gray-100 px-3 py-2.5">
                                {item.dimension}
                            </TableCell>
                            <TableCell className="h-10 border-b border-gray-100 px-3 py-2.5">
                                {item.vendor}
                            </TableCell>
                            <TableCell className="h-10 border-b border-gray-100 px-3 py-2.5">
                                {item.brand}
                            </TableCell>
                            <TableCell className="h-10 border-b border-gray-100 px-3 py-2.5">
                                {item.weight}
                            </TableCell>
                            */}
                            <TableCell className="h-10 w-30 items-center border-b border-gray-100 px-3 py-2.5">
                                <div className=" hidden items-center justify-center gap-2 group-hover:flex">
                                   <Button 
                                    className="flex h-10 w-10 items-center justify-center rounded-full! p-0"
                                    size="sm"
                                    variant="outline"
                                    onClick={()=> handleDelete(item.id)}
                                    >
                                        <BinIcon className="w-full h-full object-contain"/>
                                    </Button>
                                    <Button 
                                    className="flex  h-10 w-10 items-center justify-center rounded-full! p-0"
                                    variant="outline"
                                    onClick={()=> handleEdit(item.id)}
                                    >
                                        <PlusIcon  className="w-full h-full object-contain"/>
                                    </Button> 
                                </div>
                                
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}