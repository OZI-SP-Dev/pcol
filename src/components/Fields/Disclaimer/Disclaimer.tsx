import { PCOL } from "src/api/PCOL/types";
import BACCheckbox from "src/components/BaseFormFields/BACCheckbox";

export const Disclaimer = () => {
  // const Disclaimers = useDisclaimers();
  const Disclaimers = [
    {
      id: "RFP Disclaimer",
      text: "RFP Disclaimer",
      info: "Something about RFP Disclaimers",
    },
    {
      id: "Contract Price Disclaimer",
      text: "Contract Price Disclaimer",
      info: "Long text describing this Disclaimer",
    },
    {
      id: "Contract Price FAR 32.2 Disclaimer",
      text: "Contract Price FAR 32.2 Disclaimer",
      info: "A description about this FAR 32.2 Disclaimer",
    },
  ];

  return (
    <BACCheckbox<PCOL>
      name="Disclaimer"
      labelText="Disclaimer(s)"
      options={Disclaimers}
    />
  );
};
