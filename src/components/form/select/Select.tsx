import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    id?: string;
    name?: string;
    defaultValue?: string;
    onChange: (val: string) => void;
    className?: string;
    placeholder?: string;
    required?: boolean;
}

const Select: React.FC<SelectProps> = ({
    id,
    name,
    options,
    defaultValue = "",
    onChange,
    className = "",
    placeholder = "Placeholder",
    required,
}) => {

    const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        onChange(value);
    }
    return (
        <select
        id={id}
        name={name}
        className={
        twMerge(`appearance-none border rounded-lg px-3 py-2 border-transparent outline-none bg-[#f3f3f3] transition-all duration-500 hover:border-[#4a9dec] focus:border-[#4a9dec] focus:shadow-[0_0_0_7px_rgb(74_157_236/20%)] focus:bg-white
            ${ selectedValue
                ? "text-gray-800 dark:text-white/90"
                : "text-gray-400 dark:text-gray-400"
            }
        `, className)}
        value={selectedValue}
        onChange={handleChange}
        required={required}
        >
            {/* Placeholder option*/}
            <option 
            value=""
            disabled
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
                {placeholder}
            </option>
            {/* User options*/}
            {options.map((options) => (
                <option 
                key={options.value}
                value={options.value}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                    {options.label}
                </option>
            ))}
        </select>
    )
};

export default Select;