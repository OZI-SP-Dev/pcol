import BACTextarea from "src/components/BaseFormFields/BACTextarea";
import { NewPCOL } from "src/api/PCOL/types";

export const References = () => {
  return (
    <BACTextarea<NewPCOL>
      name="References"
      labelText="References"
      fieldProps={{ resize: "vertical", rows: 5 }}
    />
  );
};
