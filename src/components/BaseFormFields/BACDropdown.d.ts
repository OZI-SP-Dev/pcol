import { DropdownProps } from "@fluentui/react-components";
import { SelectionEvents, OptionOnSelectData } from "@fluentui/react-combobox";
import { ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
export type onOptionSelectCallback<T extends FieldValues> = (event: SelectionEvents, data: OptionOnSelectData, field: ControllerRenderProps<T, Path<T>>) => void;
export type valueCallback<T extends FieldValues> = (value: PathValue<T, Path<T>>) => string | (readonly string[] & string) | undefined;
export type TBACDropdownProps<T extends FieldValues> = BaseFormField<T> & {
    fieldProps?: Partial<DropdownProps>;
    customOnOptionSelect?: onOptionSelectCallback<T>;
    customValue?: valueCallback<T>;
};
declare const BACDropdown: <T extends FieldValues>({ name, labelText, labelInfo, rules, children, fieldProps, customOnOptionSelect, customValue, }: TBACDropdownProps<T>) => import("react/jsx-runtime").JSX.Element;
export default BACDropdown;
