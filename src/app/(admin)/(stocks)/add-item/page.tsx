"use client"
import PageBreadcrumbNav from "@/components/components-cards/PageBreadcrumbNav";
import GalleryCard from "@/components/components-cards/GalleryCard";
import ComponentsCard from "@/components/components-cards/ComponentCard";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { ChevronDownIcon } from "@/icons";
import { useState } from "react";

type Option = {
    name: string;
    subOptions: { value: string; label: string;}[]
}


const options: Option[] = [
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

    const handleSelectChange = (value: string) => {};

    //find the appropriate select box
    const selectedOption = (name: string) =>
    options.find((option) => option.name === name)?.subOptions ?? [];

    return (
        <div >
            <PageBreadcrumbNav pageTitle="Add Item" path="inventory\add-item"/>
            <div className="flex flex-col gap-6">
                <ComponentsCard title="Information">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <Input id="name" placeholder="Enter here" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="sku">SKU</label>
                                <Input id="sku" placeholder="Enter here" />
                            </div>
                            {/* dropdown*/}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="unit">Unit</label>
                                <Select                                 
                                    options={selectedOption("Unit")}
                                    placeholder="Select an option"
                                    onChange={handleSelectChange}
                                >
                                </Select>
                            </div>
                            {/* dropdown*/}
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="itemMastersStatus">Item master status</label>
                                 <Select                                 
                                    options={selectedOption("ItemMasterStatus")}
                                    placeholder="Select an option"
                                    onChange={handleSelectChange}
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
                                onChange={handleSelectChange}
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
                                onChange={handleSelectChange}
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
        </div>
    );
}