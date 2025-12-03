import { NewPCOL } from "src/api/PCOL/types";
import { useFormContext } from "react-hook-form";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { useParams } from "react-router";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";
import { useEffect } from "react";
import { useContracts } from "src/api/Contracts/Contracts";
import { useContractorPOCs } from "src/api/Contracts/ContractorPOCs";

type ContractorPOCs = { children: string; value: string }[];

export const ContractorPOC = () => {
  const { program } = useParams();
  const contracts = useContracts(program ?? "");
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
    if (Contract === "No Established Contract") {
      if (item.Contractor.Title === Contractor) {
        options.push({
          children: `${item.Title}`,
          value: `${item.Title}`,
        });
      }
    } else {
      const contractor = contracts.data?.find(
        (element) => element.ContractNumber === Contract
      );
      if (item.Contractor.Id === contractor?.Id) {
        options.push({
          children: `${item.Title}`,
          value: `${item.Title}`,
        });
      }
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
