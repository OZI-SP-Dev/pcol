import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import { useProgramDODAACs } from "src/api/DODAAC/useProgramDODAACs";
import { NewPCOL } from "src/api/PCOL/types";
import BACCombobox from "src/components/BaseFormFields/BACCombobox";

export const DODAAC = () => {
  const { program } = useParams();
  const programDODAACs = useProgramDODAACs(program ?? "");
  const { setValue } = useFormContext();

  // If program only has a single DODAAC, default to it.
  useEffect(() => {
    if (programDODAACs.data?.length === 1) {
      setValue("DODAAC", programDODAACs.data[0]);
    }
  }, [programDODAACs.data, setValue]);

  const DODAACs = programDODAACs.data?.map((item) => {
    return { children: item, value: item };
  });

  return (
    <BACCombobox<NewPCOL>
      name="DODAAC"
      labelText="DODAAC"
      rules={{ required: true }}
      options={DODAACs ?? []}
    />
  );
};
