import { PCOL } from "src/api/PCOL/types";
import { useController, useFormContext } from "react-hook-form";
import { InfoLabel, Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

/* This component to be rewritten to utilize Contractor/Contract lookup once lists are established */
export const Contractor = () => {
  const form = useFormContext<PCOL>();
  const { field } = useController<PCOL>({
    name: "Contract",
    control: form.control,
  });
  return (
    <>
      <InfoLabel
        htmlFor="ContractorId"
        weight="semibold"
        className="fieldLabel"
      >
        <TextFieldIcon className="fieldIcon" />
        Contractor
      </InfoLabel>

      <Text id="ContractorId">
        {field.value
          ? field.value + " Contractor"
          : "Select a Contract to see the associated Contractor"}
      </Text>
    </>
  );
};
