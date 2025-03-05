import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const CCP = () => {
  return (
    <BACInput<PCOL> name="CCP" labelText="Contract Change Proposal (CCP)" />
  );
};
