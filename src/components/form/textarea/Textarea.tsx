import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps {
    id?: string;
    name?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
    rows?: number;
    placeholder?: string
    required?: boolean; 
}

const Textarea: React.FC<TextareaProps> = ({
    id,
    name,
    className,
    onChange,
    maxLength,
    rows,
    placeholder,
    required
}) => {

    const [text, setText] = useState("");

    const currentLength = text.length;

   return(
        <div>
            <div className="flex justify-center w-full">
                <textarea 
                    id={id}
                    name={name}
                    maxLength={maxLength}
                    rows={rows}
                    value={text}
                    placeholder={placeholder}
                    required={required}
                    className={
                    twMerge(`
                    flex w-full border rounded-lg px-3 py-2 border-transparent outline-none bg-[#f3f3f3] transition-all duration-500 hover:border-[#4a9dec] focus:border-[#4a9dec] focus:shadow-[0_0_0_7px_rgb(74_157_236/20%)] focus:bg-white
                    `, className)}

                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <label 
                htmlFor={id} 
                className={` block mt-3
                ${
                    maxLength && currentLength >= maxLength ?  "text-red-500" : "text-black"
                }`}>
                    {maxLength && currentLength >= maxLength ? '*' : ''}

                    {currentLength} / {maxLength}
            </label>
        </div>
   )
};

export default Textarea;