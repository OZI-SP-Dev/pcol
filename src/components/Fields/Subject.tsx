import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const Subject = () => {
  return (
    <BACInput<PCOL>
      name="Title"
      labelText="Subject"
      rules={{ required: true }}
    />
  );
};
