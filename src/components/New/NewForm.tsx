import "./NewForm.css";
import { Title1 } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";
import { defaultPCOL } from "src/api/PCOL/defaults";
import { PCOL } from "src/api/PCOL/types";
import { Subject } from "src/components/Fields/Subject";

const NewForm = () => {
  const newForm = useForm<PCOL>({
    defaultValues: defaultPCOL,
    criteriaMode: "all",
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
        </form>
      </FormProvider>
    </div>
  );
};

export default NewForm;
