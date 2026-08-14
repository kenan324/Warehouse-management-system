"use client"
import { useState } from "react";

const GalleryCard: React.FC = ({
}) => {

    //test images
    const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);
    
    return (
        <div className="flex flex-col w-full max-w-xl items-center justify-center rounded-2xl">
            <div className="h-70 w-full overflow-hidden rounded-xl">
                <img
                src={`${selectedImage}?auto=format&fit=crop&w=1000&q=80`}
                alt="main-image"
                className="h-full w-full object-cover transition-all duration-300"
                />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`h-20 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === image
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
                >
                    <img
                    src={`${image}?auto=format&fit=crop&w=300&q=80`}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full object-cover"
                    />
                </button>
                ))}
            </div>
        </div>
    );
};

export default GalleryCard;