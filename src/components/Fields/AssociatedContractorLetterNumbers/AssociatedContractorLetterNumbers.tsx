import BACTextarea from "src/components/BaseFormFields/BACTextarea";
import { PCOL } from "src/api/PCOL/types";

export const AssociatedContractorLetterNumbers = () => {
  return (
    <BACTextarea<PCOL>
      name="AssociatedContractorLetterNumbers"
      labelText="Associated Contractor Letter Numbers"
      fieldProps={{ resize: "vertical", rows: 5 }}
    />
  );
};
