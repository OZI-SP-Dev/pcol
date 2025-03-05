import BACTextarea from "src/components/BaseFormFields/BACTextarea";
import { PCOL } from "src/api/PCOL/types";

export const References = () => {
  return (
    <BACTextarea<PCOL>
      name="References"
      labelText="References"
      fieldProps={{ resize: "vertical", rows: 5 }}
    />
  );
};
