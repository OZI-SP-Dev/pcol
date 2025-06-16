import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const Subject = () => {
  return (
    <BACInput<NewPCOL>
      name="Subject"
      labelText="Subject"
      rules={{ required: true }}
    />
  );
};
