export interface Item {
    id: string;
    name: string;
    sku: string;
    unit: string;
    itemMasterStatus: string 
}

export type CreateItemInput = Omit<Item, 'id'>;
export type UpdateItemInput = Partial<CreateItemInput>;