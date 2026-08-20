"use client"
import PageBreadcrumbNav from "@/components/components-cards/PageBreadcrumbNav";
import GalleryCard from "@/components/components-cards/GalleryCard";
import ComponentsCard from "@/components/components-cards/ComponentCard";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { useActionState, useState } from "react";
import { submitActionFrom } from "@/action/item-action";
import { initialActionState } from "@/schemas/item-schema";
import Button from "@/components/ui/Button/Button";
import InputLabel from "@/components/components-cards/InputLabel";
import { Option } from "@/type/option-type";
import { useItem } from "@/hook/Item-Hook/useItem";

const options: Option[]= [
    {
        name: "Unit",
        subOptions: [
            { value: "box", label: "Box" },
            { value: "bag", label: "Bag" },
            { value: "bundle", label: "Bundle" },
        ]
    },
    {
        name: "ItemMasterStatus",
        subOptions: [
            { value: "marketing", label: "Marketing" },
            { value: "template", label: "Template" },
            { value: "development", label: "Development" },
        ]
    },
    {
        name: "Vendor",
        subOptions: [
            { value: "Bingo", label: "bingo" },
        ]
    },
    {
        name: "Brand",
        subOptions: [
            { value: "bingo", label: "Bingo" },
            { value: "adidas", label: "Adidas" },

        ]
    },
];

export default function AddItem() {
    const [state, fromAction] = useActionState(
        submitActionFrom,
        initialActionState
    );

    const {
        form,
        fromValid,
        setFrom,
        handleChange,
    } = useItem();

    //find the appropriate select box
    const selectedOption = (name: string) =>
    options.find((option) => option.name === name)?.subOptions ?? [];

    return (
        <form action={fromAction}>
            <PageBreadcrumbNav pageTitle="Add Item" path="inventory\add-item"/>
            <div className="flex flex-col gap-6">
                <ComponentsCard title="Information">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="name" value={form.name}>
                                    {form.name.trim() === "" ? "*Name" : "Name"}
                                </InputLabel>
                                <Input  id="name" name="name" placeholder="Enter here" min="1" max="20" required
                                onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="sku" value={form.sku}>
                                    {form.sku.trim() === "" ? "*SKU" : "SKU"}
                                </InputLabel>
                                <Input id="sku" name="sku" placeholder="Enter here" min="1" max="20" required
                                onChange={handleChange}
                                />
                            </div>
                            {/* dropdown*/}
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="unit" value={form.unit}>
                                    {form.unit.trim() === "" ? "*Unit" : "Unit"}
                                </InputLabel>
                                <Select  
                                    id="unit"
                                    name="unit"                               
                                    options={selectedOption("Unit")}
                                    placeholder="Select an option"
                                    onChange={handleChange}
                                    required
                                >
                                </Select>
                            </div>
                            {/* dropdown*/}
                            <div className="flex flex-col gap-2 ">
                                <InputLabel htmlFor="itemMasterStatus" value={form.itemMasterStatus}>
                                    {form.itemMasterStatus.trim() === "" ? "*ItemMasterStatus" : "ItemMasterStatus"}
                                </InputLabel>
                                 <Select    
                                    id="itemMasterStatus"
                                    name="itemMasterStatus"                              
                                    options={selectedOption("ItemMasterStatus")}
                                    placeholder="Select an option"
                                    onChange={handleChange}
                                >
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-center">
                                <ComponentsCard title="Picture" className="m-0 w-130 h-auto">
                                    <GalleryCard />
                                </ComponentsCard>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>UPC</label>
                            <Input placeholder="Enter here" />
                        </div>
                        {/* dropdown*/}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="vendor" >Vendor</label>
                            <Select                                 
                                options={selectedOption("Vendor")}
                                placeholder="Select an option"
                            ></Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="enm">ENM</label>
                            <Input id="enm" placeholder="Enter here" />
                        </div>
                        {/* dropdown*/}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="brand">Brand</label>
                            <Select                                 
                                options={selectedOption("Brand")}
                                placeholder="Select an option"
                            ></Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="dimension">Dimension</label>
                            <Input id="dimension" placeholder="Enter here" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weight">Weight</label>
                            <Input id="weight" placeholder="Enter here" />
                        </div>
                    </div>
                </ComponentsCard>
                <ComponentsCard title="Description">
                    <Input placeholder="Enter here" />
                </ComponentsCard>
            </div>
            <Button type="submit" disabled={!fromValid}>
                Select
            </Button>
        </form>
    );
}