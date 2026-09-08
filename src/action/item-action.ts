"use server"

import { createItemSchema, itemSchema, updateItemSchema } from "@/schemas/item-schema";
import { itemService } from "@/service/ItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionResult } from "next/dist/shared/lib/app-router-types";
import { error } from "console";





export async function submitActionFrom(
    previousState: ActionResult,
    formData: FormData, 
): Promise<ActionResult> {
        const data = {
            name: formData.get('name') as string,
            sku: formData.get('sku') as string,
            unit: formData.get('unit') as string,
            itemMasterStatus: formData.get('itemMasterStatus') as string,
            upc: formData.get('upc') as string,
            enm: formData.get('enm') as string,
            dimension: formData.get('dimension') as string,
            vendor: formData.get('vendor') as string,
            brand: formData.get('brand') as string,
            weight: formData.get('weight') as string,
        }

        const parsed = createItemSchema.safeParse(data);

        if(!parsed.success){
            return {
                success: false,
                error: "Input invalid",
                fieldErrors: parsed.error.flatten().fieldErrors,
            }
        }

        try {
            await itemService.create(parsed.data);
        } catch (err){
            return{
                success: false,
                error: "Cannot create new item",
            } 
        };      
    revalidatePath('/items');
    redirect('/stock-items')
}
export async function updateActionFrom(
    id: string,
    previousState: ActionResult,
    formData: FormData, 
): Promise<ActionResult> {
        const data = {
            name: formData.get('name') as string,
            sku: formData.get('sku') as string,
            unit: formData.get('unit') as string,
            itemMasterStatus: formData.get('itemMasterStatus') as string,
            upc: formData.get('upc') as string,
            enm: formData.get('enm') as string,
            dimension: formData.get('dimension') as string,
            vendor: formData.get('vendor') as string,
            brand: formData.get('brand') as string,
            weight: formData.get('weight') as string,
        }
        
        const parsed = updateItemSchema.safeParse(data);

        if(!parsed.success){
            return {
                success: false,
                error: "Input invalid",
                fieldErrors: parsed.error.flatten().fieldErrors,
            }
        }
        try {
            await itemService.update(parsed.data , id);
        } catch (err){
            return{
                success: false,
                error: "Cannot update item",
            } 
        };
    revalidatePath('/items');
    redirect('/stock-items');
}

export async function deleteItem(
    id: string
): Promise<ActionResult> {

    try {
        await itemService.delete(id);
        revalidatePath('/items');    
        return {success: true};
    } catch (error) {
        return{
            success: false,
            error: "Failed to delete item",
        } 
    };
}