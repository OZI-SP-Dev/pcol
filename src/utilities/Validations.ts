import { ContractRuleFinal } from "src/components/Fields/Contract/Contract.Validation";
import { DODAACRuleFinal } from "src/components/Fields/DODAAC/DODAAC.Validation";
import { ReferencesRuleFinal } from "src/components/Fields/References/References.Validation";
import { SubjectRuleFinal } from "src/components/Fields/Subject/Subject.Validation";
import { DeliveryOrderModRuleFinal } from "src/components/Fields/DeliveryOrderMod/DeliveryOrderMod.Validation";
import { RFIRuleFinal } from "src/components/Fields/RFI/RFI.Validation";
import { RFPRuleFinal } from "src/components/Fields/RFP/RFP.Validation";
import { ECPRuleFinal } from "src/components/Fields/ECP/ECP.Validation";
import { CCPRuleFinal } from "src/components/Fields/CCP/CCP.Validation";
import { AssociatedContractorLetterNumbersRuleFinal } from "src/components/Fields/AssociatedContractorLetterNumbers/AssociatedContractorLetterNumbers.Validation";
import { DisclaimersRuleFinal } from "src/components/Fields/Disclaimer/Disclaimer.Validation";
import { CarbonCopyRuleFinal } from "src/components/Fields/CarbonCopy/CarbonCopy.Validation";
import { AdditionalDistributionInfoRuleFinal } from "src/components/Fields/AdditionalDistributionInfo/AdditionalDistributionInfo.Validation";

export const useNewPageValidation = () => {
  return SubjectRuleFinal.and(ReferencesRuleFinal)
    .and(DODAACRuleFinal)
    .and(ContractRuleFinal)
    .and(DeliveryOrderModRuleFinal)
    .and(RFIRuleFinal)
    .and(RFPRuleFinal)
    .and(ECPRuleFinal)
    .and(CCPRuleFinal)
    .and(AssociatedContractorLetterNumbersRuleFinal)
    .and(DisclaimersRuleFinal)
    .and(CarbonCopyRuleFinal)
    .and(AdditionalDistributionInfoRuleFinal);
};
