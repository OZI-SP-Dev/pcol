import { Label, Text, Title2 } from "@fluentui/react-components";
import { usePCOL } from "src/api/PCOL/usePCOL";
import { useParams } from "react-router-dom";
import { useContracts } from "src/api/Contracts/Contracts";

const ViewPCOLDetails = () => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));
  const contracts = useContracts(String(program));

  return (
    <>
      <Title2>PCOL Details</Title2>
      <br />
      {pcol.isLoading && <div>Fetching data...</div>}
      <br />
      {pcol.data && (
        <>
          <article className="viewPCOLDetails">
            <Label weight="semibold" htmlFor="Title">
              Control Number
            </Label>
            <Text id="Title">{pcol.data.Title}</Text>

            <Label weight="semibold" htmlFor="initiator">
              Initiator
            </Label>
            <Text id="initiator">{pcol.data.Author?.Title}</Text>

            <Label weight="semibold" htmlFor="subject">
              Subject
            </Label>
            <Text id="subject">{pcol.data.Subject}</Text>

            <Label weight="semibold" htmlFor="references">
              References
            </Label>
            <Text id="references" style={{ whiteSpace: "pre-line" }}>
              {pcol.data.References}
            </Text>

            <Label weight="semibold" htmlFor="DODAAC">
              DODAAC
            </Label>
            <Text id="DODAAC">{pcol.data.DODAAC}</Text>

            <Label weight="semibold" htmlFor="Contract">
              Contract
            </Label>
            <Text id="Contract">{pcol.data.Contract}</Text>

            <Label weight="semibold" htmlFor="Contractor">
              Contractor
            </Label>
            <Text id="Contractor">
              {
                contracts.data?.find(
                  (contract) => contract.Title === pcol.data.Contract
                )?.Contractor.Title
              }
            </Text>

            <Label weight="semibold" htmlFor="DeliveryOrderMod">
              DeliveryOrderMod
            </Label>
            <Text id="DeliveryOrderMod">{pcol.data.DeliveryOrderMod}</Text>

            <Label weight="semibold" htmlFor="RFI">
              RFI
            </Label>
            <Text id="RFI">{pcol.data.RFI}</Text>

            <Label weight="semibold" htmlFor="RFP">
              RFP
            </Label>
            <Text id="RFP">{pcol.data.RFP}</Text>

            <Label weight="semibold" htmlFor="ECP">
              ECP
            </Label>
            <Text id="ECP">{pcol.data.ECP}</Text>

            <Label weight="semibold" htmlFor="CCP">
              CCP
            </Label>
            <Text id="sprd">{pcol.data.CCP}</Text>

            <Label
              weight="semibold"
              htmlFor="AssociatedContractorLetterNumbers"
            >
              AssociatedContractorLetterNumbers
            </Label>
            <Text
              id="AssociatedContractorLetterNumbers"
              style={{ whiteSpace: "pre-line" }}
            >
              {pcol.data.AssociatedContractorLetterNumbers}
            </Text>

            <Label weight="semibold" htmlFor="Disclaimer">
              Disclaimer
            </Label>
            <Text id="Disclaimer">
              {pcol.data.Disclaimers?.map((item) => (
                <>
                  {item}
                  <br />
                </>
              ))}
            </Text>

            <Label weight="semibold" htmlFor="CarbonCopy">
              CarbonCopy
            </Label>
            <Text id="CarbonCopy" style={{ whiteSpace: "pre-line" }}>
              {pcol.data.CarbonCopy}
            </Text>

            <Label weight="semibold" htmlFor="AdditionalDistributionInfo">
              AdditionalDistributionInfo
            </Label>
            <Text id="AdditionalDistributionInfo">
              {pcol.data.AdditionalDistributionInfo}
            </Text>
          </article>
        </>
      )}
      {pcol.isError && (
        <div>An error has occured: {(pcol.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewPCOLDetails;
