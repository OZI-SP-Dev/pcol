import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const AdditionalDistributionInfo = () => {
  return (
    <BACInput<PCOL>
      name="AdditionalDistributionInfo"
      labelText="Additional Distribution Information"
    />
  );
};
