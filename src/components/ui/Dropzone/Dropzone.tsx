

import { ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

interface DropzoneProps {
    className?: string;
    children: (files: File[]) => React.ReactNode;
    maxSize: number;
    maxFiles: number;
}


const Dropzone:React.FC<DropzoneProps> = ({
    className,
    children,
    maxFiles,
    maxSize,
}) => {

    const [files, setFiles] = useState<File[]>([])

    const dataFormat = 1000000; //MB

    const onDrop = useCallback( (acceptedFiles: File[]) => {
        if (acceptedFiles.length) {
            const addFiles = (previousFile: File[]) => [
                ...previousFile,
                ...acceptedFiles
            ]
            setFiles(addFiles)
        
        } 
    }, [setFiles]);

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        },
        maxSize: maxSize,
        maxFiles: maxFiles,
    });

    const isActive = files.length > 0;

    return(
        <>
            <div 
            {...getRootProps()} 
            className={`flex flex-col flex-1 w-full items-center justify-center rounded-2xl
                    ${
                        isActive ? "hidden" : ""
                    }`}
            
            >
                <div className={ twMerge(`flex flex-col flex-1 w-full px-6 items-center justify-center cursor-pointer border-2 border-dashed solid rounded-xl text-center transition-all duration-300 focus:outline-none focus:ring-black focus-visible:ring-2
                    
                    ${
                        isDragActive 
                            ? "border-black bg-gray-100" 
                            : "border-gray-300 bg-white hover:border-gray-500"
                    }
                `, className) 
                }
                    
                >
                    <input {...getInputProps()} className="h-full w-full overflow-hidden rounded-xl"/>
                    {  isDragActive 
                    ? (
                        <p>Drop the file here ...</p>) 
                    : (<>
                        <p> Drag n Drop file here </p>
                        <p>Up to {maxSize / dataFormat} MB, for up to {maxFiles} files</p>
                    </>)
                    }
                    
                </div>
            </div>
            {children(files)}
        </>
    );
}
export default Dropzone;