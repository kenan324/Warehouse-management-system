export interface Item {
    id: string;
    name: string;
    sku: string;
    unit: string;
    itemMasterStatus: string;

    code?: {
        upc?: string | undefined,
        ean?: string | undefined,
    },
    productInfo?: {
        vendor?: string | undefined,
        brand?: string | undefined,
        description?: string | undefined,
    },
    physicalInfo?: {
        dimension?: string | undefined,
        weight?: string | undefined,
    }
}

export type CreateItemInput = Omit<Item, 'id'>;
export type UpdateItemInput = Partial<CreateItemInput>;