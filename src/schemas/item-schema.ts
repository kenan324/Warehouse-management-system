import { z } from "zod"


export const itemSchema = z.object({
    id: z.number(),
    name: z.string(),
    sku: z.string(),
    unit: z.string(),
    itemMasterStatus: z.string()
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
    success: false,
    error: "",
    fieldErrors: {},
}