import { TextareaProps } from "@fluentui/react-components";
import { FieldValues } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
declare const BACTextarea: <T extends FieldValues>({ name, labelText, labelInfo, rules, fieldProps, }: BaseFormField<T> & {
    fieldProps?: Partial<TextareaProps>;
}) => import("react/jsx-runtime").JSX.Element;
export default BACTextarea;
