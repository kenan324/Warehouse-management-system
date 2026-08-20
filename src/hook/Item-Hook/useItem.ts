"use client"

import { useState } from "react";

export function useItem() {
    
    const [form, setFrom] = useState({
        name: "",
        sku: "",
        unit: "",
        itemMasterStatus: "",
    });

    const fromValid = Object.values(form).every(value => value.trim());

    // handle Change to HtmlInputElements or HtmlSelectElements ets...
    function handleChange 
    <T extends { name: string; value:string } >
        (e: React.ChangeEvent<T>) {
            setFrom(prev => ({...prev, [e.target.name]: e.target.value}))
        }

    return {
        form,
        setFrom,
        handleChange,
        fromValid,
    }
}