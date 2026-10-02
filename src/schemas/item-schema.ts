import { z } from "zod"


export const itemSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(50),
    sku: z.string().min(1).max(50),
    unit: z.string().min(1).max(50),
    itemMasterStatus: z.string().min(1).max(50),
    
    code: z.object({
        // have to use sting because z does not recognize 
        // the fist digit as 0 and filters it out of var 
        upc: z.string().regex(/^\d{12}$/).optional(),
        ean: z.string().regex(/^(?:\d{13}|\d{8})$/).optional(),
    }).optional(),

    productInfo: z.object({
        vendor: z.string().max(50).optional(),
        brand: z.string().max(50).optional(),
        description: z.string().max(300).optional(),
    }).optional(),

    physicalInfo: z.object({
        dimension: z.string().max(20).optional(),
        weight: z.string().max(20).optional(),
    }).optional(),
});

export const createItemSchema = itemSchema.omit({ id:true});
export const updateItemSchema = createItemSchema.partial();

export type ItemSchemaType = z.Infer<typeof itemSchema>;
export type CreateItemSchemaType = z.Infer<typeof createItemSchema>;
export type UpdateItemSchemaType = z.Infer<typeof updateItemSchema>;

type FieldErrors = Partial<Record<keyof CreateItemSchemaType, string>>;

export type ActionResult = {
    success: boolean,
    error?: string,
    fieldErrors?: FieldErrors
}

export const initialActionState: ActionResult = {
    success: true,
    error: "",
    fieldErrors: {},
}