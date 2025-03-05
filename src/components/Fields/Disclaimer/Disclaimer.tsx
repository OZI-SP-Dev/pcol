import { PCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

export const Disclaimer = () => {
  // const Disclaimers = useDisclaimers();
  const Disclaimers = [
    { children: "RFP Disclaimer", value: "RFP Disclaimer" },
    {
      children: "Contract Price Disclaimer",
      value: "Contract Price Disclaimer",
    },
    {
      children: "Contract Price FAR 32.2 Disclaimer",
      value: "Contract Price FAR 32.2 Disclaimer",
    },
  ];

  return (
    <BACCombobox<PCOL>
      name="Disclaimer"
      labelText="Disclaimer"
      options={Disclaimers}
    />
  );
};
