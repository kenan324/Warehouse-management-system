"use client"


import { Item } from "@/type/item-types";
import { useState } from "react";
import { string } from "zod";

export function useItem() {
    
    // the user has to fill mandatory values before the form is valid
    type ItemFrom = Omit<Item, 'id'>;

    const [form, setForm] = useState<ItemFrom>({
        name: "",
        sku: "",
        unit: "",
        itemMasterStatus: "",
    });

    const fromValid = Object.values(form)
    .filter(value => typeof value === "string")
    // string for now 
    .every(value => value.trim().length > 0);

    // handle Change to HtmlInputElements or HtmlSelectElements ets...
    function handleChange 
    <T extends { name: string; value:string } >
        (e: React.ChangeEvent<T>) {
            setForm(prev => ({...prev, [e.target.name]: e.target.value}))
        }

    return {
        form,
        setForm,
        handleChange,
        fromValid,
    }
}