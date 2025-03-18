import {
  Combobox,
  ComboboxProps,
  InfoLabel,
  Text,
  useComboboxFilter,
} from "@fluentui/react-components";
import { SelectionEvents, OptionOnSelectData } from "@fluentui/react-combobox";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import { BaseFormField } from "./BaseTypeDef";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

export type onOptionSelectCallback<T extends FieldValues> = (
  event: SelectionEvents,
  data: OptionOnSelectData,
  field: ControllerRenderProps<T, Path<T>>
) => void;

export type onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => void;

export type valueCallback<T extends FieldValues> = (
  value: PathValue<T, Path<T>>
) => string | (readonly string[] & string) | undefined;

const BACCombobox = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  options,
  fieldProps,
  customOnOptionSelect,
  customValue,
}: BaseFormField<T> & {
  fieldProps?: Partial<ComboboxProps>;
  options: { children: string; value: string }[];
  customOnOptionSelect?: onOptionSelectCallback<T>;
  customValue?: valueCallback<T>;
}) => {
  const form = useFormContext<T>();

  const [query, setQuery] = useState("");
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value ?? "");
  };

  const children = useComboboxFilter(query, options, {
    noOptionsMessage: "No matches for your search.",
  });

  /* Is it a required field, if so, then mark the label as required */
  const isRequired: boolean = rules?.required ? true : false;

  const { field, fieldState } = useController<T>({
    name,
    control: form.control,
    rules,
  });

  return (
    <>
      <InfoLabel
        htmlFor={name + "Id"}
        weight="semibold"
        className="fieldLabel"
        required={isRequired}
        info={labelInfo}
      >
        <DropdownIcon className="fieldIcon" />
        {labelText}
      </InfoLabel>
      <Combobox
        aria-describedby={name + "Err"}
        id={name + "Id"}
        aria-invalid={fieldState.error ? "true" : "false"}
        autoComplete="on"
        {...field}
        selectedOptions={field.value ? [field.value] : []}
        onOptionSelect={
          customOnOptionSelect
            ? (event, data) => {
                customOnOptionSelect(event, data, field);
                setQuery(data.optionValue ?? "");
              }
            : (_event, data) => {
                field.onChange(data.optionValue ?? "");
                setQuery(data.optionValue ?? "");
              }
        }
        value={
          customValue
            ? customValue(field.value)
            : field.value !== ""
              ? field.value
              : query
        }
        onChange={onChangeHandler}
        freeform={false}
        clearable={true}
        listbox={{ style: { maxHeight: "50vh" } }}
        {...fieldProps}
        onBlur={() => setQuery("")}
      >
        {children ?? <></>}
      </Combobox>
      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACCombobox;
