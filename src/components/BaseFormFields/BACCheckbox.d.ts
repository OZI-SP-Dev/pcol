import { FieldValues } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
declare const BACCheckbox: <T extends FieldValues>({ name, labelText, labelInfo, rules, options, }: BaseFormField<T> & {
    options: {
        id: string;
        text: string;
        info?: string;
    }[];
}) => import("react/jsx-runtime").JSX.Element;
export default BACCheckbox;
