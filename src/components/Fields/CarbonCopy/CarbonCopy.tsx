import BACTextarea from "src/components/BaseFormFields/BACTextarea";
import { NewPCOL } from "src/api/PCOL/types";

export const CarbonCopy = () => {
  return (
    <BACTextarea<NewPCOL>
      name="CarbonCopy"
      labelText="Carbon Copy"
      fieldProps={{ resize: "vertical", rows: 5 }}
    />
  );
};
