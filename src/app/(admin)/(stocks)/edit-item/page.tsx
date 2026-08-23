"use client"

import PageBreadcrumbNav from "@/components/components-cards/PageBreadcrumbNav";
import GalleryCard from "@/components/components-cards/GalleryCard";
import ComponentsCard from "@/components/components-cards/ComponentCard";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { useActionState, useEffect, useState } from "react";
import { submitActionFrom } from "@/action/item-action";
import { initialActionState } from "@/schemas/item-schema";
import Button from "@/components/ui/Button/Button";
import InputLabel from "@/components/components-cards/InputLabel";
import { Option } from "@/type/option-type";
import { useItem } from "@/hook/Item-Hook/useItem";
import { Item } from "@/type/item-types";
import { useRouter, useSearchParams } from "next/navigation";
import { string } from "zod";
import { itemService } from "@/service/ItemService";

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

export default function EditItem() {
    const [state, fromAction] = useActionState(
        submitActionFrom,
        initialActionState
    );
    const [item, setItem] = useState<Item>();
    const router = useRouter();

    const {
        form,
        fromValid,
        setFrom,
        handleChange,
    } = useItem();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    useEffect(() => {
        const loadItem = async () => {
            if(!id) {
                router.push('/stock-items');
                throw Error("Search parameter ID is null");
            }

            const item = await itemService.getById(id);

            setItem(item);
            // to do fix this 
            // using a normal input value in input produces an uncontrolled input to be controlled error 
            // value changing from undefined to defined value
            setFrom({
                name: item.name,
                sku: item.sku,
                unit: item.unit,
                itemMasterStatus: item.itemMasterStatus,
            })
        }
        loadItem();


    }, [id, router]);
    //find the appropriate select box
    const selectedOption = (name: string) =>
    options.find((option) => option.name === name)?.subOptions ?? [];

    return (
        <form>
            <PageBreadcrumbNav pageTitle="Edit Item" path="inventory\edit-item"/>
            <div className="flex flex-col gap-6">
                <ComponentsCard title="Information">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="name" value={form.name}>
                                   Name
                                </InputLabel>
                                <Input  id="name" name="name" defaultValue={item?.name} placeholder="Enter here" min="1" max="20" required
                                onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="sku" value={form.sku}>
                                    SKU
                                </InputLabel>
                                <Input id="sku" name="sku" defaultValue={item?.sku} placeholder="Enter here" min="1" max="20" required
                                onChange={handleChange}
                                />
                            </div>
                            {/* dropdown*/}
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="unit" value={form.unit}>
                                    Unit
                                </InputLabel>
                                <Select  
                                    id="unit"
                                    name="unit"                               
                                    options={selectedOption("Unit")}
                                    placeholder="Select an option"
                                    onChange={handleChange}
                                    defaultValue={item?.unit}
                                    required
                                >
                                </Select>
                            </div>
                            {/* dropdown*/}
                            <div className="flex flex-col gap-2 ">
                                <InputLabel htmlFor="itemMasterStatus" value={form.itemMasterStatus}>
                                    ItemMasterStatus
                                </InputLabel>
                                 <Select    
                                    id="itemMasterStatus"
                                    name="itemMasterStatus"                              
                                    options={selectedOption("ItemMasterStatus")}
                                    placeholder="Select an option"
                                    defaultValue={item?.itemMasterStatus}
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
                            <InputLabel htmlFor="upc">
                                UPC
                            </InputLabel>
                            <Input id="upc" name="upc" defaultValue={item?.upc} placeholder="Enter here" min="1" max="20" required
                            onChange={handleChange}
                            />
                        </div>
                        {/* dropdown*/}
                        <div className="flex flex-col gap-2">
                            <InputLabel>
                                Vendor
                            </InputLabel>
                            <Select
                                id="vendor"
                                name="vendor"                                 
                                options={selectedOption("Vendor")}
                                placeholder="Select an option"
                                defaultValue={item?.vendor}
                                onChange={handleChange}
                            ></Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="enm">
                                ENM
                            </InputLabel>
                            <Input id="enm" name="enm" defaultValue={item?.enm} placeholder="Enter here" min="1" max="20" required
                            onChange={handleChange}
                            />
                        </div>
                        {/* dropdown*/}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="brand">
                                Brand
                            </InputLabel>
                            <Select
                                id="brand"
                                name="brand"                                 
                                options={selectedOption("Brand")}
                                placeholder="Select an option"
                                defaultValue={item?.brand}
                                onChange={handleChange}
                            ></Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="dimension" >
                                Dimension
                            </InputLabel>
                            <Input id="dimension" name="dimension" defaultValue={item?.dimension} placeholder="Enter here" min="1" max="20" required
                            onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="weight" >
                                Weight
                            </InputLabel>
                            <Input id="weight" name="weight" defaultValue={item?.weight} placeholder="Enter here" min="1" max="20" required
                            onChange={handleChange}
                            />
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