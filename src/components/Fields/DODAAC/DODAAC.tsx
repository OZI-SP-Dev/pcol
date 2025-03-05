import { PCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

export const DODAAC = () => {
  // const DODAACs = useDODAACs();
  const DODAACs = [
    { children: "FA1234", value: "FA1234" },
    { children: "FA9876", value: "FA9876" },
    { children: "FA5555", value: "FA5555" },
  ];

  return (
    <BACCombobox<PCOL>
      name="DODAAC"
      labelText="DODAAC"
      rules={{ required: true }}
      options={DODAACs}
    />
  );
};
