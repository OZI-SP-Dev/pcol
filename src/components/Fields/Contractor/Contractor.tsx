import { NewPCOL } from "src/api/PCOL/types";
import { useController, useFormContext } from "react-hook-form";
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

  const contract = contracts.data?.find(
    (element) => element.ContractNumber === field.value
  );

  // Anytime Contract changes, reset Contractor
  useEffect(() => {
    resetField("Contractor", {
      defaultValue: contract?.Contractor.Title ?? "",
    });
  }, [Contract, contract?.Contractor.Title, resetField]);

  const options: ContractorOptions = [];
  contractors.data?.forEach((item) => {
    if (
      field.value === "No Established Contract" ||
      contract?.Contractor.Title === item.Title
    ) {
      options.push({
        children: `${item.Title}`,
        value: `${item.Title}`,
      });
    }
  });

  return (
    <>
      <BACCombobox<NewPCOL>
        name="Contractor"
        labelText="Contractor"
        labelIcon={<TextFieldIcon className="fieldIcon" />}
        rules={{ required: true }}
        options={options}
      />
    </>
  );
};
