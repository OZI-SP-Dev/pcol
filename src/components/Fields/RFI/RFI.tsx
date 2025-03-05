import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const RFI = () => {
  return (
    <BACInput<PCOL> name="RFI" labelText="Request for Information (RFI)" />
  );
};
