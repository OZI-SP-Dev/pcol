import BACTextarea from "src/components/BaseFormFields/BACTextarea";
import { NewPCOL } from "src/api/PCOL/types";

export const AssociatedContractorLetterNumbers = () => {
  return (
    <BACTextarea<NewPCOL>
      name="AssociatedContractorLetterNumbers"
      labelText="Associated Contractor Letter Numbers"
      fieldProps={{ resize: "vertical", rows: 5 }}
    />
  );
};
