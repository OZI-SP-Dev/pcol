import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  // MessageBar,
  // MessageBarBody,
  // MessageBarTitle,
  // Spinner,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { SaveIcon } from "@fluentui/react-icons-mdl2";
// import { usePCOL } from "src/api/PCOL/usePCOL";
import { NewPCOL } from "src/api/PCOL/types";

const EditDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  // const { program, pcolId } = useParams();
  // const pcol = usePCOL(String(program), Number(pcolId));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { Author, Created, ...data } = pcol.data ?? {};
  const myForm = useForm<NewPCOL>({
    // defaultValues: data,
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  // Reset the form if request.data changes and when form is opened/closed
  // useEffect(() => {
  //   if (data) {
  //     myForm.reset(data);
  //   }
  // }, [data, isOpen, myForm]);

  // useEffect(() => {
  //   if (updatePCOL.isSuccess) {
  //     const timeOut = setTimeout(() => {
  //       setIsOpen(false);
  //       updatePCOL.reset();
  //     }, 2000);

  //     return () => clearTimeout(timeOut);
  //   }
  // }, [updatePCOL.isSuccess, updatePCOL.reset(), setIsOpen]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<NewPCOL> = (_data) => {
    // updatePCOL.mutateAsync(data).then(() => {});
  };

  return (
    <Drawer type="overlay" position="end" size="medium" open={isOpen}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              // disabled={updatePCOL.isLoading}
              icon={<DismissRegular />}
              onClick={() => setIsOpen(false)}
            />
          }
        >
          Edit PCOL
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        <FormProvider {...myForm}>
          <form id="editForm" onSubmit={myForm.handleSubmit(onSubmit)}></form>
        </FormProvider>
      </DrawerBody>
      <DrawerFooter>
        {/* {!updatePCOL.isSuccess && ( */}
        <Button
          style={{ marginLeft: "auto" }}
          appearance="primary"
          form="editForm"
          type="submit"
          value="submit"
          // disabled={updatePCOL.isLoading || updatePCOL.isSuccess}
          // icon={updatePCOL.isLoading ? <Spinner /> : <SaveIcon />}
        >
          Save
        </Button>
        {/* )} */}
        {/* {(updatePCOL.isSuccess || updatePCOL.isError) && (
          <MessageBar intent={updatePCOL.isSuccess ? "success" : "error"}>
            <MessageBarBody>
              <MessageBarTitle>
                {updatePCOL.isSuccess ? "Success!" : "Error!"}
              </MessageBarTitle>
              {updatePCOL.isError &&
                updatePCOL.error instanceof Error &&
                updatePCOL.error.message}
            </MessageBarBody>
          </MessageBar>
        )} */}
      </DrawerFooter>
    </Drawer>
  );
};

export default EditDrawer;
