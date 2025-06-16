import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const RFP = () => {
  return (
    <BACInput<NewPCOL> name="RFP" labelText="Request for Proposal (RFP)" />
  );
};
