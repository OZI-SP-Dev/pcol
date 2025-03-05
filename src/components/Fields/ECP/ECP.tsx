import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const ECP = () => {
  return (
    <BACInput<PCOL> name="ECP" labelText="Engineering Change Proposal (ECP)" />
  );
};
