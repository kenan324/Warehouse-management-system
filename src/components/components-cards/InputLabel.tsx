import { ReactNode } from "react";

interface InputLabelPrev {
    children?: ReactNode;
    htmlFor?: string;
    value?: string | any;
}

const InputLabel: React.FC<InputLabelPrev> = ({
    htmlFor,
    value = "default", // default behavioral val
    children,
}) =>{

    

    return(
        <label 
        htmlFor={htmlFor}
        className={`
        ${
            value.trim() === "" ? "text-red-500" : "text-black"
        }`}
        >
           { value.trim() === "" ? `*${children}` : children}
        </label>
    );
};

export default InputLabel;