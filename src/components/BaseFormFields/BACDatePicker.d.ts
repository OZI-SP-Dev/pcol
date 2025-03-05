import { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { FieldValues } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
declare const BACDatePicker: <T extends FieldValues>({ name, labelText, labelInfo, rules, fieldProps, }: BaseFormField<T> & {
    fieldProps?: Partial<DatePickerProps>;
}) => import("react/jsx-runtime").JSX.Element;
export default BACDatePicker;
