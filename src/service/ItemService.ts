import { CreateItemInput, Item } from "@/type/item-types";
import { db } from "@/config/firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { CreateItemSchemaType, UpdateItemSchemaType } from "@/schemas/item-schema";
import { dummiesitems } from "@/type/dummy-items";

const COLLECTION = "items";



export const itemService = {
    
    async itemExist(id: string): Promise<boolean> {
        const docSnap = await getDoc(doc(db, COLLECTION, id));
        return docSnap.exists();
    },

    async list(): Promise<Item[]> {
        const docSnap = await getDocs(collection(db,COLLECTION));
        return docSnap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }) as Item)
    },

    async getById(id: string): Promise<Item> {
        const docSnap = await getDoc(doc(db,COLLECTION,id));
        return {
            ...docSnap.data(),
            id: docSnap.id
        } as Item
    },

    async create(data: CreateItemSchemaType): Promise<void> {
        try {
            await addDoc(collection(db, COLLECTION), data);
        } catch (error) {
            throw error;
        }
    },

    async update(data: UpdateItemSchemaType, id: string): Promise<void> {
        try {
            await updateDoc(doc(db,COLLECTION, id), data);
        } catch (error) {
            throw error;
        }
    },
    
    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(doc(db, COLLECTION, id));
        } catch (error) {
            throw error;
        }
    },

    async createDummyData(): Promise<void> {
        const dummy =  dummiesitems;
        try {
            for (const item of dummy) {
                await addDoc(collection(db, COLLECTION,),item);
            };
        } catch (error) {
            throw error;            
        }
    }
}