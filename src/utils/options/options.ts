import { Option } from "@/type/option-type";

//find the appropriate select box
export const getSelectedOption = (options: Option[], name: string) =>
options.find((option) => option.name === name)?.subOptions ?? [];