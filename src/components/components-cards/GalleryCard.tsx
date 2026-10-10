"use client"
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { ImageFile } from "@/type/image-types";
import GalleryModal from "./modal/galleryModal/GalleryModal";


interface GalleryCardProp {
    files : File[];
}

const GalleryCard: React.FC<GalleryCardProp> = ({
    files
}) => {
    const [arrayOfImages, setArrayOfImages] = useState<ImageFile[]>([]);
    const [image, setImage] = useState<ImageFile | null> ();
    const [index, setIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
 
    useEffect(() => {
        const imageFile = (files.map((file) => 
        // create preview to file property
        Object.assign(file, { preview: URL.createObjectURL(file)})
        ));
        setArrayOfImages(imageFile);
        setImage(imageFile[0]);
        // remove preview from object to clean up memory 
        return () => imageFile.forEach((file) => URL.revokeObjectURL(file.preview))
    }, [files]);


    // return null for undefined selectedImage
    if (!image) return null;

    const handleMove = (direction : number) => {
        if (!image) return;

        const current = arrayOfImages.findIndex((img) => img === image);

        const next = current + direction;
        
        if (next <= -1 || next === arrayOfImages.length) return;

        setImage(arrayOfImages[next]);
        
        if (next < index) setIndex(next)
        if (next >= index + 5) setIndex(next - 4)
    }  

    const visibleImages = arrayOfImages.slice(
        index,
        index + 5
    )

    type MoveButtonProps = {
        symbol: string; 
        direction: number
    }

    const MoveButton: React.FC<MoveButtonProps> = ({
        symbol,
        direction,
    }) => {
        return (
            <button
                    onClick={() => {
                        handleMove(direction);
                    }}
                    className={`relative overflow-hidden bg-blue-100 rounded border-transparent border-2 transition-all duration-100 hover:border-gray-300 active:border-black`}
                > 
                {symbol}
            </button>
        )
    };
    return (
        <div className="flex flex-col w-full max-w-xl items-center justify-center rounded-2xl">
            <button 
            onClick={() => setIsModalOpen(true)}
            >
                Modal
            </button>

            <GalleryModal
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen((prev) => !prev)}
                images={arrayOfImages}
                setImages={setArrayOfImages}
            >

            </GalleryModal>
            <div className="relative h-70 w-full overflow-hidden rounded-xl">
                <Image 
                src={image.preview}
                alt={image.name}
                fill
                className="h-full w-full object-contain transition-all duration-300"
                />
            </div>
            <div className="mt-3 flex justify-center gap-2">
                <MoveButton symbol="←" direction={-1}/>
                {visibleImages.map((img, index) => (
                    <button
                    key={index}
                    onClick={() => setImage(img)}
                    className={`relative h-20 w-20 overflow-hidden rounded-b-lg border-2 transition-all
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
                ))}
                <MoveButton symbol="→" direction={1}/>
            </div>
        </div>
    );
};

export default GalleryCard;