import { useParams } from "react-router";
import { useContracts } from "src/api/Contracts/Contracts";
import { PCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

type ContractOptions = { children: string; value: string }[];

export const Contract = () => {
  const { program } = useParams();
  const contracts = useContracts(program ?? "");
  const options: ContractOptions = [];
  contracts.data?.forEach((item) => {
    options.push({
      children: item.Title,
      value: item.Title,
    });
  });

  return (
    <BACCombobox<PCOL>
      name="Contract"
      labelText="Contract"
      rules={{ required: true }}
      options={options}
    />
  );
};
