import PageBreadcrumbNav from "@/app/components/componentsCards/breadcrumbnav/PageBreadcrumbNav";
import GalleryCard from "@/app/components/componentsCards/galleryCard/GalleryCard";
import ComponentsCard from "@/app/components/componentsCards/mainComponentCard/ComponentCard";
import Input from "@/app/components/form/input/InputField";

export default function AddItem() {
    return (
        <div >
            <PageBreadcrumbNav pageTitle="Add Item" path="inventory\add-item"/>
            <div className="flex flex-col gap-6">
                <ComponentsCard title="Information">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label>Name</label>
                                <Input placeholder="Enter here" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>SKU</label>
                                <Input placeholder="Enter here" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Unit</label>
                                <Input placeholder="Enter here" />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <label>Item master status</label>
                                <Input placeholder="Enter here" />
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
                        <div className="flex flex-col gap-2">
                            <label>Vendor</label>
                            <Input placeholder="Enter here" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>ENM</label>
                            <Input placeholder="Enter here" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Brand</label>
                            <Input placeholder="Enter here" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Dimension</label>
                            <Input placeholder="Enter here" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Weight</label>
                            <Input placeholder="Enter here" />
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