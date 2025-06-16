import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const RFI = () => {
  return (
    <BACInput<NewPCOL> name="RFI" labelText="Request for Information (RFI)" />
  );
};
