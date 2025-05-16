import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const AdditionalDistributionInfo = () => {
  return (
    <BACInput<NewPCOL>
      name="AdditionalDistributionInfo"
      labelText="Additional Distribution Information"
    />
  );
};
