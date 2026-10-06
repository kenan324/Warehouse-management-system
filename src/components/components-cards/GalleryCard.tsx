"use client"
import { useEffect, useState } from "react";
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
            <div className="mt-3 grid grid-cols-4 gap-2">
                {images.map((image, index) => (
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
            </div>
        </div>
    );
};

export default GalleryCard;