import BACInput from "src/components/BaseFormFields/BACInput";
import { PCOL } from "src/api/PCOL/types";

export const DeliveryOrderMod = () => {
  return (
    <BACInput<PCOL>
      name="DeliveryOrderMod"
      labelText="Modification / Delivery Order"
    />
  );
};
