

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

interface DropzoneProps {
    className?: string;
    Files: React.Dispatch<React.SetStateAction<File[]>> // change const name
}


const Dropzone:React.FC<DropzoneProps> = ({
    className,
    Files
}) => {

    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback( (acceptedFiles: File[]) => {
        if (acceptedFiles.length) {
            const addFiles = (previousFile: File[]) => [
                ...previousFile,
                ...acceptedFiles
            ]
            //local state
            setFiles(addFiles);
            Files(addFiles)
        
        } 
    }, [Files]);

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({onDrop});

    const isActive = files.length > 0;

    return(
        <div 
        {...getRootProps()} 
        className={
            twMerge(`flex flex-col w-full max-w-xl items-center justify-center rounded-2xl
                ${
                    isActive ? "hidden" : ""
                }
                `
                , className
            )}
        
        >
            <input {...getInputProps()} className="h-70 w-full overflow-hidden rounded-xl"/>
            {  isDragActive 
            ? (<p>Drop the file here ...</p>) 
            : (<p> Drag n Drop file here </p>)
            }
        </div>
        
    );
}
export default Dropzone;