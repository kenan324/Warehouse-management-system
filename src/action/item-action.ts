"use server"

import { createItemSchema, itemSchema } from "@/schemas/item_schema";
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
            itemMasterStatus: formData.get('itemMastersStatus') as string,
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
            //await itemService.create(parsed.data);
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