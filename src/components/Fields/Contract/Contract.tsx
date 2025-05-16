import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import { useContracts } from "src/api/Contracts/Contracts";
import { NewPCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

type ContractOptions = { children: string; value: string }[];

export const Contract = () => {
  const { program } = useParams();
  const contracts = useContracts(program ?? "");
  const { resetField, watch } = useFormContext<NewPCOL>();
  const DODAAC = watch("DODAAC");

  // Anytime DODAAC changes, reset Contract
  useEffect(() => {
    resetField("Contract");
  }, [DODAAC, resetField]);

  const options: ContractOptions = [];
  contracts.data?.forEach((item) => {
    if (DODAAC === item.DODAAC) {
      options.push({
        children: item.Title,
        value: item.Title,
      });
    }
  });

  return (
    <BACCombobox<NewPCOL>
      name="Contract"
      labelText="Contract"
      rules={{ required: true }}
      options={options}
    />
  );
};
