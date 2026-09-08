import EditFrom from "@/components/EditForm";
import { itemService } from "@/service/ItemService";
import { redirect } from "next/navigation";


export default async function EditItem({
    params,
}: {
    params: Promise<{ id:string }>
}) {
    const { id } = await params;
    
    if(!id) {
        // if there a empty string go back to stock
        redirect('/stock-items');
    };
    
    const item = await itemService.getById(id);
    return (
       <EditFrom id={ id } item={ item }/>
    );
}