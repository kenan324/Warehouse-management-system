"use client"
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { ImageFile } from "@/type/image-types";


interface GalleryCardProp {
    files : File[];
}

const GalleryCard: React.FC<GalleryCardProp> = ({
    files
}) => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [selectedImages, setSelectedImages] = useState<ImageFile | null> ();
    const [index, setIndex] = useState<number>(0);

    
 
    useEffect(() => {
        const imageFile = (files.map((file) => 
        // create preview to file property
        Object.assign(file, { preview: URL.createObjectURL(file)})
        ));
        setImages(imageFile);
        setSelectedImages(imageFile[0]);
        // remove preview from object to clean up memory 
        return () => imageFile.forEach((file) => URL.revokeObjectURL(file.preview))
    }, [files]);


    // return null for undefined selectedImage
    if (!selectedImages) return null;

    const handleMove = (direction : number) => {
        if (!selectedImages) return;

        const current = images.findIndex((img) => img === selectedImages);

        const next = current + direction;
        
        if (next <= -1 || next === images.length) return;

        setSelectedImages(images[next]);
        
        if (next < index) setIndex(next)
        if (next >= index + 5) setIndex(next - 4)
    }  

    const visibleImages = images.slice(
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
            <div className="relative h-70 w-full overflow-hidden rounded-xl">
                <Image 
                src={selectedImages.preview}
                alt={selectedImages.name}
                fill
                className="h-full w-full object-contain transition-all duration-300"
                />
            </div>
            <div className="mt-3 flex justify-center gap-2">
                <MoveButton symbol="←" direction={-1}/>
                {visibleImages.map((image, index) => (
                    <button
                    key={index}
                    onClick={() => setSelectedImages(image)}
                    className={`relative h-20 w-20 overflow-hidden rounded-b-lg border-2 transition-all
                        ${
                            selectedImages === image
                                ? "border-black"
                                : "border-transparent hover:border-gray-300"
                        }`}
                    >
                        <Image 
                        src={image.preview}
                        alt={image.name}
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