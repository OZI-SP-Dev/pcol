import { ComboboxProps } from "@fluentui/react-components";
import { SelectionEvents, OptionOnSelectData } from "@fluentui/react-combobox";
import { ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
import { ChangeEvent } from "react";
export type onOptionSelectCallback<T extends FieldValues> = (event: SelectionEvents, data: OptionOnSelectData, field: ControllerRenderProps<T, Path<T>>) => void;
export type onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => void;
export type valueCallback<T extends FieldValues> = (value: PathValue<T, Path<T>>) => string | (readonly string[] & string) | undefined;
declare const BACCombobox: <T extends FieldValues>({ name, labelText, labelInfo, rules, options, fieldProps, customOnOptionSelect, customValue, }: BaseFormField<T> & {
    fieldProps?: Partial<ComboboxProps>;
    options: {
        children: string;
        value: string;
    }[];
    customOnOptionSelect?: onOptionSelectCallback<T>;
    customValue?: valueCallback<T>;
}) => import("react/jsx-runtime").JSX.Element;
export default BACCombobox;
