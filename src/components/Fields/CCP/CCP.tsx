import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const CCP = () => {
  return (
    <BACInput<NewPCOL> name="CCP" labelText="Contract Change Proposal (CCP)" />
  );
};
