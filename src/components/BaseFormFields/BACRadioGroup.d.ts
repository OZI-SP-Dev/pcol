import { RadioGroupProps, RadioGroupOnChangeData } from "@fluentui/react-components";
import { FieldValues } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
import { FormEvent } from "react";
declare const BACRadioGroup: <T extends FieldValues>({ name, labelText, labelInfo, rules, fieldProps, customOnChange, children, }: BaseFormField<T> & {
    fieldProps?: Partial<RadioGroupProps>;
    customOnChange?: (ev: FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default BACRadioGroup;
