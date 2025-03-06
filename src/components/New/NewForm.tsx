import "./NewForm.css";
import { Title1 } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewPageValidation } from "src/utilities/Validations";
import { defaultPCOL } from "src/api/PCOL/defaults";
import { PCOL } from "src/api/PCOL/types";
import { Subject } from "src/components/Fields/Subject/Subject";
import { References } from "src/components/Fields/References/References";
import { DODAAC } from "src/components/Fields/DODAAC/DODAAC";
import { Contract } from "src/components/Fields/Contract/Contract";
import { Contractor } from "src/components/Fields/Contractor/Contractor";
import { DeliveryOrderMod } from "src/components/Fields/DeliveryOrderMod/DeliveryOrderMod";
import { RFI } from "src/components/Fields/RFI/RFI";
import { RFP } from "src/components/Fields/RFP/RFP";
import { ECP } from "src/components/Fields/ECP/ECP";
import { CCP } from "src/components/Fields/CCP/CCP";
import { AssociatedContractorLetterNumbers } from "src/components/Fields/AssociatedContractorLetterNumbers/AssociatedContractorLetterNumbers";
import { Disclaimer } from "src/components/Fields/Disclaimer/Disclaimer";
import { CarbonCopy } from "src/components/Fields/CarbonCopy/CarbonCopy";

const NewForm = () => {
  const schema = useNewPageValidation();

  const newForm = useForm<PCOL>({
    defaultValues: defaultPCOL,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Title1 align="center">
        <b>Initiate New PCOL</b>
      </Title1>
      <FormProvider {...newForm}>
        <form id="newForm" className="newFormContainer">
          <div className="newFormFieldContainer">
            <Subject />
          </div>
          <div className="newFormFieldContainer">
            <References />
          </div>
          <div className="newFormFieldContainer">
            <DODAAC />
          </div>
          <div className="newFormFieldContainer">
            <Contract />
          </div>
          <div className="newFormFieldContainer">
            <Contractor />
          </div>
          <div className="newFormFieldContainer">
            <DeliveryOrderMod />
          </div>
          <div className="newFormFieldContainer">
            <RFI />
          </div>
          <div className="newFormFieldContainer">
            <RFP />
          </div>
          <div className="newFormFieldContainer">
            <ECP />
          </div>
          <div className="newFormFieldContainer">
            <CCP />
          </div>
          <div className="newFormFieldContainer">
            <AssociatedContractorLetterNumbers />
          </div>
          <div className="newFormFieldContainer">
            <Disclaimer />
          </div>
          <div className="newFormFieldContainer">
            <CarbonCopy />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewForm;
