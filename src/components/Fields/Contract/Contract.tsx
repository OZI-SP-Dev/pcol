import { useController, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import { useContracts } from "src/api/Contracts/Contracts";
import { PCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

type ContractOptions = { children: string; value: string }[];

export const Contract = () => {
  const { program } = useParams();
  const contracts = useContracts(program ?? "");
  const form = useFormContext<PCOL>();
  const { field } = useController<PCOL>({
    name: "DODAAC",
    control: form.control,
  });

  const options: ContractOptions = [];
  contracts.data?.forEach((item) => {
    if (field.value.includes(item.DODAAC)) {
      options.push({
        children: item.Title,
        value: item.Title,
      });
    }
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
