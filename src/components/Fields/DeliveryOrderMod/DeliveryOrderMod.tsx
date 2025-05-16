import BACInput from "src/components/BaseFormFields/BACInput";
import { NewPCOL } from "src/api/PCOL/types";

export const DeliveryOrderMod = () => {
  return (
    <BACInput<NewPCOL>
      name="DeliveryOrderMod"
      labelText="Delivery Order / Modification"
    />
  );
};
