import BACTextarea from "src/components/BaseFormFields/BACTextarea";
import { PCOL } from "src/api/PCOL/types";

export const CarbonCopy = () => {
  return (
    <BACTextarea<PCOL>
      name="CarbonCopy"
      labelText="Carbon Copy"
      fieldProps={{ resize: "vertical", rows: 5 }}
    />
  );
};
