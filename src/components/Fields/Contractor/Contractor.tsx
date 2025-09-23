import { NewPCOL } from "src/api/PCOL/types";
import { useController, useFormContext } from "react-hook-form";
import { InfoLabel, Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { useParams } from "react-router";
import { useContracts } from "src/api/Contracts/Contracts";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";
import { useContractors } from "src/api/Contracts/Contractors";
import { useEffect } from "react";

type ContractorOptions = { children: string; value: string }[];

export const Contractor = () => {
  const { program } = useParams();
  const contracts = useContracts(program ?? "");
  const contractors = useContractors(program ?? "");
  const { control, resetField, watch } = useFormContext<NewPCOL>();
  const Contract = watch("Contract");
  const { field } = useController<NewPCOL>({
    name: "Contract",
    control: control,
  });

  // Anytime Contract changes, reset Contractor
  useEffect(() => {
    resetField("Contractor");
  }, [Contract, resetField]);

  const contract = contracts.data?.find(
    (element) => element.ContractNumber === field.value
  );

  const options: ContractorOptions = [];
  contractors.data?.forEach((item) => {
    options.push({
      children: `${item.Title}`,
      value: `${item.Title}`,
    });
  });

  return (
    <>
      {field.value !== "No Established Contract" && (
        <>
          <InfoLabel
            htmlFor="Contractor"
            weight="semibold"
            className="fieldLabel"
          >
            <TextFieldIcon className="fieldIcon" />
            Contractor
          </InfoLabel>

          <Text id="Contractor">
            {contract
              ? contract.Contractor.Title
              : "Select a Contract to see the associated Contractor"}
          </Text>
        </>
      )}
      {field.value === "No Established Contract" && (
        <BACCombobox<NewPCOL>
          name="Contractor"
          labelText="Contractor"
          labelIcon={<TextFieldIcon className="fieldIcon" />}
          rules={{ required: true }}
          options={options}
        />
      )}
    </>
  );
};
