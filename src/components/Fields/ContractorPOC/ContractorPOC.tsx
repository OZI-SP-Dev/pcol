import { NewPCOL } from "src/api/PCOL/types";
import { useFormContext } from "react-hook-form";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { useParams } from "react-router";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";
import { useEffect } from "react";
import { useContractorPOCs } from "src/api/Contracts/ContractorPOCs";

type ContractorPOCs = { children: string; value: string }[];

export const ContractorPOC = () => {
  const { program } = useParams();
  const contractorPOCs = useContractorPOCs(program ?? "");
  const { resetField, watch } = useFormContext<NewPCOL>();
  const Contract = watch("Contract");
  const Contractor = watch("Contractor");

  // Anytime Contractor changes, reset ContractorPOC
  useEffect(() => {
    resetField("ContractorPOC");
  }, [Contract, Contractor, resetField]);

  const options: ContractorPOCs = [];
  contractorPOCs.data?.forEach((item) => {
    if (item.Contractor.Title === Contractor) {
      options.push({
        children: `${item.Title}`,
        value: `${item.Title}`,
      });
    }
  });

  return (
    <BACCombobox<NewPCOL>
      name="ContractorPOC"
      labelText="Contractor POC"
      labelIcon={<TextFieldIcon className="fieldIcon" />}
      rules={{ required: true }}
      options={options}
    />
  );
};
