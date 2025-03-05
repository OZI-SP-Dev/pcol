import { ContractRuleFinal } from "src/components/Fields/Contract/Contract.Validation";
import { DODAACRuleFinal } from "src/components/Fields/DODAAC/DODAAC.Validation";
import { ReferencesRuleFinal } from "src/components/Fields/References/References.Validation";
import { SubjectRuleFinal } from "src/components/Fields/Subject/Subject.Validation";
import { DeliveryOrderModRuleFinal } from "src/components/Fields/DeliveryOrderMod/DeliveryOrderMod.Validation";
import { RFIRuleFinal } from "src/components/Fields/RFI/RFI.Validation";
import { RFPRuleFinal } from "src/components/Fields/RFP/RFP.Validation";
import { ECPRuleFinal } from "src/components/Fields/ECP/ECP.Validation";
import { CCPRuleFinal } from "src/components/Fields/CCP/CCP.Validation";

export const useNewPageValidation = () => {
  return SubjectRuleFinal.merge(ReferencesRuleFinal)
    .merge(DODAACRuleFinal)
    .merge(ContractRuleFinal)
    .merge(DeliveryOrderModRuleFinal)
    .merge(RFIRuleFinal)
    .merge(RFPRuleFinal)
    .merge(ECPRuleFinal)
    .merge(CCPRuleFinal);
};
