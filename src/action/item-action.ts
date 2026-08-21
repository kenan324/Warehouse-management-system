"use server"

import { createItemSchema, itemSchema } from "@/schemas/item-schema";
import { itemService } from "@/service/ItemService";
import { ActionResult } from "next/dist/shared/lib/app-router-types";



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
            return {
                success: true,
            };
        } catch (err){
            return{
                success: false,
                error: "Cannot create new item",
            } 
        };
}