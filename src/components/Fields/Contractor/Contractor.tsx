import { PCOL } from "src/api/PCOL/types";
import { useController, useFormContext } from "react-hook-form";
import { InfoLabel, Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { useParams } from "react-router";
import { useContracts } from "src/api/Contracts/Contracts";

export const Contractor = () => {
  const { program } = useParams();
  const contracts = useContracts(program ?? "");
  const form = useFormContext<PCOL>();
  const { field } = useController<PCOL>({
    name: "Contract",
    control: form.control,
  });

  const contract = contracts.data?.find(
    (element) => element.Id.toString() === field.value
  );

  return (
    <>
      <InfoLabel htmlFor="Contractor" weight="semibold" className="fieldLabel">
        <TextFieldIcon className="fieldIcon" />
        Contractor
      </InfoLabel>

      <Text id="Contractor">
        {contract
          ? contract.Contractor.Title
          : "Select a Contract to see the associated Contractor"}
      </Text>
    </>
  );
};
