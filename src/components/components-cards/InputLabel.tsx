import { ReactNode } from "react";

interface InputLabelPrev {
    children?: ReactNode;
    htmlFor?: string;
    value?: string | any;
}

const InputLabel: React.FC<InputLabelPrev> = ({
    htmlFor,
    value,
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
            {children}
        </label>
    );
};

export default InputLabel;