"use server"

import { createItemSchema, itemSchema, updateItemSchema } from "@/schemas/item-schema";
import { itemService } from "@/service/ItemService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionResult } from "next/dist/shared/lib/app-router-types";


const trim = (val: FormDataEntryValue | null)
 :string | undefined => {
    if (typeof val !== "string")
        return undefined;

    return val.trim() === '' ? undefined : val; 
};

// this function is used for filtering undefined values that
// user enters 
function filterUndefinedValues<T extends Record<string, any>>(
    obj: T
): Record<string, any> { 
    return Object.fromEntries(
        Object.entries(obj)
        .map(
            ([key, value]) => 
            {
                if (value && typeof value === "object")
                    // returns value inside the object 
                    value = filterUndefinedValues(value);

                return [key, value];
            })
        .filter(
            ([,value]) => 
                value !== undefined && 
                // this filters inside the object
                // checks if the value is empty  
                !(typeof value && Object.keys(value).length === 0)
        )
    ) as Partial<T>
}

export async function submitActionFrom(
    previousState: ActionResult,
    formData: FormData, 
): Promise<ActionResult> {
    
        const data = filterUndefinedValues({
            name: formData.get('name') as string,
            sku: formData.get('sku') as string,
            unit: formData.get('unit') as string,
            itemMasterStatus: formData.get('itemMasterStatus') as string,
            code: {
                upc: trim(formData.get('upc') as string),
                ean: trim(formData.get('ean') as string),
            },
            
            productInfo: {
                vendor: trim(formData.get('vendor') as string),
                brand: trim(formData.get('brand') as string),
            },
            
            physicalInfo: {
                dimension: trim(formData.get('dimension') as string),
                weight: trim(formData.get('weight') as string),
            },
        });

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