import { InputProps } from "@fluentui/react-components";
import { FieldValues } from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
declare const BACInput: <T extends FieldValues>({ name, labelText, labelInfo, labelIcon, rules, fieldProps, disableError, }: BaseFormField<T> & {
    fieldProps?: Partial<InputProps>;
    /** Don't show the error message within the component -- If using this, you should be displaying the error message elsewhere.  It still sets the aria-invalid flag and sets RHF as error */
    disableError?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default BACInput;
