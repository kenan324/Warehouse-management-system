import { ImageFile } from "@/type/image-types";
import { Dialog, DialogContent } from "../../../ui/Dialog/dialog";
import Image from "next/image";
import { cn } from "cn";
import { useState } from "react";
import { Button } from "@/components/ui/button";


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
    const [selecting, setSelecting] = useState(true);
    const [isSelected, setIsSelected] = useState<number[]>([]);
    
    const handleAddImage = () => {
        

    }

    const handleSelect  = () => {
        setImage(null);
        if (!selecting) setIsSelected([]);
        setSelecting((prev) => !prev)
    }

    const handleDelete = () => {

    }
    const toggleSelect = (index: number) => {
        setIsSelected(
            (prev) => prev.includes(index) 
                ? prev.filter((i) => i !== index) 
                : [...prev, index]
        )
    }

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent  className={cn(`flex flex-col w-[95vw]! h-[90vh]! max-w-4xl! overflow-hidden p-0 gap-0 rounded-2xl border border-gray-200 bg-white`)}>
                <div className={`px-4 py-2 mb-2 border-b border-gray-100 dark:border-gray-800`}>
                    <h2 className="text-xl font-bold  text-gray-800 dark:text-white/90">
                        Edit Gallery
                    </h2>
                    <p> {images.length} photos</p>
                </div>
                <div className="flex justify-end items-end gap-2 mr-3">
                    <Button
                        size="lg"
                        onClick={handleAddImage}
                        className="w-25 h-10 border border-transparent bg-[#0A66C2] text-white hover:border-black hover:bg-[#16437E] active:bg-[#09223b] active:text-white/70 "
                    >
                        Add image
                    </Button>
                    { !selecting && (
                        <Button 
                            onClick={handleDelete}
                            className={`w-25 h-10 border border-transparent bg-[#DC2626] text-white hover:border-black hover:bg-[#B91C1C] active:bg-[#7F1D1D] active:text-white/70 focus:border-black`}
                        >
                            Delete
                        </Button>   
                    )}
                    <Button 
                        onClick={() => handleSelect()}
                        className={cn(`w-25 h-10 border border-black text-black hover:bg-[#eaeaea] active:border-gray-100 active:text-white/70 
                            ${
                                selecting ? "bg-[#feffff]" : "bg-[#cacaca] focus:border-black"
                            }`
                            
                        )}
                    >
                         { selecting ? "Select" : "Done"} 
                    </Button>
                </div>
                <div className="overflow-y-auto m-2 p-2 ">
                    <div className="mt-3 grid grid-cols-3 place-items-center gap-2">
                        {images.map((img, index) => (
                            <button
                            key={index}
                            onClick={() => {!selecting ? toggleSelect(index) :  setImage(img)  }}
                            className={`relative h-60 w-60 overflow-hidden rounded-2xl border-2 transition-all
                                ${
                                    image === img 
                                ? "border-black"
                                : "border-transparent hover:border-gray-300"
                                }
                                ${
                                    !selecting && isSelected.includes(index)
                                ? "border-blue-500 ring-2 ring-blue-500"
                                : ""
                                }
                                
                                `}
                                
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