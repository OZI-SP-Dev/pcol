import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const ECP = () => {
  return (
    <BACInput<NewPCOL>
      name="ECP"
      labelText="Engineering Change Proposal (ECP)"
    />
  );
};
