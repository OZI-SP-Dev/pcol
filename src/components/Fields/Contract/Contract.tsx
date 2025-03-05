import { PCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

export const Contract = () => {
  // const Contracts = useContracts();
  const Contracts = [
    { children: "FA1234", value: "FA1234-0001" },
    { children: "FA9876", value: "FA9876-0001" },
    { children: "FA5555", value: "FA5555-0001" },
  ];

  return (
    <BACCombobox<PCOL>
      name="Contract"
      labelText="Contract"
      rules={{ required: true }}
      options={Contracts}
    />
  );
};
