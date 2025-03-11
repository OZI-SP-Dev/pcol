import { useParams } from "react-router";
import { useDisclaimers } from "src/api/Disclaimer/useDisclaimers";
import { PCOL } from "src/api/PCOL/types";
import BACCheckbox from "src/components/BaseFormFields/BACCheckbox";

type DisclaimerOptions = {
  id: string;
  text: string;
  info?: string;
};

export const Disclaimer = () => {
  const { program } = useParams();
  const GlobalDisclaimers = useDisclaimers();
  const ProgramDisclaimers = useDisclaimers(program);

  const Disclaimers: DisclaimerOptions[] = [];
  GlobalDisclaimers.data?.forEach((item) =>
    Disclaimers.push({ id: item.Title, text: item.Title, info: item.Statement })
  );
  ProgramDisclaimers.data?.forEach((item) =>
    Disclaimers.push({ id: item.Title, text: item.Title, info: item.Statement })
  );

  return (
    <>
      <BACCheckbox<PCOL>
        name="Disclaimer"
        labelText="Disclaimer(s)"
        options={Disclaimers}
      />
      {(GlobalDisclaimers.isError || ProgramDisclaimers.isError) && (
        <>
          There was an error fetching Disclaimer statements. Refresh the page to
          try again, or contact support.
        </>
      )}
    </>
  );
};
