import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const RFP = () => {
  return <BACInput<PCOL> name="RFP" labelText="Request for Proposal (RFP)" />;
};
