import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    defaultValue?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min?: string;
    max?: string;
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({
    type = "text",
    id,
    name,
    placeholder,
    defaultValue,
    onChange,
    className,
    min,
    max,
    disabled 
}) => {

    return (
            <input 
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            min={min}
            max={max}
            disabled={disabled} 
            className={twMerge(`border rounded-lg px-3 py-2 border-transparent outline-none bg-[#f3f3f3] transition-all duration-500 hover:border-[#4a9dec] focus:border-[#4a9dec] focus:shadow-[0_0_0_7px_rgb(74_157_236/20%)] focus:bg-white)`
                , className)}
            />
    );
};

export default Input;