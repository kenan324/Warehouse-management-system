import { ImageFile } from "@/type/image-types";
import { Dialog, DialogContent } from "../../../ui/Dialog/dialog";
import Image from "next/image";
import { cn } from "cn";
import { useState } from "react";


interface GalleryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    images: ImageFile[];
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>
}

const GalleryModal: React.FC<GalleryModalProps> = ({
    images,
    setImages,
    open,
    onOpenChange,
}) => {

    const [image, setImage] = useState<ImageFile | null> ();
    
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent  className={cn(`flex flex-col w-[95vw]! h-[90vh]! max-w-4xl! overflow-hidden p-0 gap-0 rounded-2xl border border-gray-200 bg-white`)}>
                <div className={`px-4 py-2 border-b border-gray-100 dark:border-gray-800`}>
                    <h2 className="text-xl font-bold  text-gray-800 dark:text-white/90">
                        Edit Gallery
                    </h2>
                    <p> {images.length} photos</p>
                </div>
                <div className="overflow-y-auto m-2 p-2 ">
                    <div className="mt-3 grid grid-cols-3 place-items-center gap-2">
                        {images.map((img, index) => (
                            <button
                            key={index}
                            onClick={() => setImage(img)}
                            className={`relative h-60 w-60 overflow-hidden rounded-2xl border-2 transition-all
                                ${
                                    image === img
                                ? "border-black"
                                : "border-transparent hover:border-gray-300"
                                }`}
                            >
                                <Image 
                                src={img.preview}
                                alt={img.name}
                                fill
                                className="h-full w-full  object-cover "
                                />
                            </button>
                        ))};
                    </div>
                </div>
                
            </DialogContent>
        </Dialog>
    )
}
export default GalleryModal;