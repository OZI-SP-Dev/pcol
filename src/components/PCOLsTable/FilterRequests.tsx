import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { DismissRegular } from "@fluentui/react-icons";
import { PCOLFilter } from "src/api/PCOL/usePCOLs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFilterFields {
  Title: string;
  Subject: string;
  Stage: string;
  Contract: string;
  afterDate: Date | null;
  beforeDate: Date | null;
}

const FilterPCOLsDrawer = ({
  isOpen,
  setIsOpen,
  filterState,
  setFilterState,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filterState: PCOLFilter[];
  setFilterState: (filters: PCOLFilter[]) => void;
}) => {
  const afterDate = filterState.filter((obj) => {
    return obj.modifier === "afterDate";
  })[0]?.filter;
  const beforeDate = filterState.filter((obj) => {
    return obj.modifier === "beforeDate";
  })[0]?.filter;

  const { control, handleSubmit, reset } = useForm<IFilterFields>({
    defaultValues: {
      Title:
        filterState
          .filter((obj) => {
            return obj.column === "Title";
          })[0]
          ?.filter.toString() ?? "",
      Subject:
        filterState
          .filter((obj) => {
            return obj.column === "Subject";
          })[0]
          ?.filter.toString() ?? "",
      Stage:
        filterState
          .filter((obj) => {
            return obj.column === "Stage";
          })[0]
          ?.filter.toString() ?? "",
      Contract:
        filterState
          .filter((obj) => {
            return obj.column === "Contract";
          })[0]
          ?.filter.toString() ?? "",
      afterDate: afterDate instanceof Date ? new Date(afterDate) : null,
      beforeDate: beforeDate instanceof Date ? new Date(beforeDate) : null,
    },
  });
  const onSubmit: SubmitHandler<IFilterFields> = (data) => {
    const newFilter: PCOLFilter[] = [];

    if (data.Title) {
      newFilter.push({
        column: "Title",
        filter: data.Title,
        queryString: `substringof('${data.Title}',Title)`,
      });
    }

    if (data.Subject) {
      newFilter.push({
        column: "Subject",
        filter: data.Subject,
        queryString: `substringof('${data.Subject}',Subject)`,
      });
    }

    if (data.Stage) {
      newFilter.push({
        column: "Stage",
        filter: data.Stage,
        queryString: `substringof('${data.Stage}',Stage)`,
      });
    }

    if (data.Contract) {
      newFilter.push({
        column: "Contract",
        filter: data.Contract,
        queryString: `substringof('${data.Contract}',Contract)`,
      });
    }

    if (data.beforeDate) {
      newFilter.push({
        column: "Created",
        modifier: "beforeDate",
        filter: data.beforeDate,
        queryString: `(Created le '${new Date(
          data.beforeDate
        ).toISOString()}')`,
      });
    }

    if (data.afterDate) {
      newFilter.push({
        column: "Created",
        modifier: "afterDate",
        filter: data.afterDate,
        queryString: `(Created ge '${new Date(data.afterDate).toISOString()}')`,
      });
    }

    setFilterState(newFilter);
    setIsOpen(false);
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      size="medium"
      style={{ height: "100vh", minWidth: "fit-content" }}
      open={isOpen}
      onOpenChange={(_e, { open }) => setIsOpen(open)}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Filters
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody
          style={{
            /* Header/footer padding = 72px */
            maxHeight: "calc(100vh - 72px - 3em)",
          }}
        >
          <hr />
          <Field label="Control Number">
            <Controller
              name="Title"
              control={control}
              render={({ field }) => <Input type="search" {...field} />}
            />
          </Field>
          <hr />
          <Field label="Subject">
            <Controller
              name="Subject"
              control={control}
              render={({ field }) => <Input type="search" {...field} />}
            />
          </Field>
          <hr />
          <Field label="Stage">
            <Controller
              name="Stage"
              control={control}
              render={({ field }) => <Input type="search" {...field} />}
            />
          </Field>
          <hr />
          <Field label="Contract">
            <Controller
              name="Contract"
              control={control}
              render={({ field }) => <Input type="search" {...field} />}
            />
          </Field>
          <hr />
          <Field label="Modified After">
            <Controller
              name="afterDate"
              control={control}
              render={({ field }) => (
                <>
                  <DatePicker
                    formatDate={(date?: Date) => {
                      return date?.toLocaleDateString() ?? "";
                    }}
                    onSelectDate={field.onChange}
                    {...field}
                  />
                  <Button
                    appearance="primary"
                    style={{ marginTop: "2px", width: "fit-content" }}
                    onClick={() => field.onChange("")}
                  >
                    Clear
                  </Button>
                </>
              )}
            />
          </Field>
          <hr />
          <Field label="Modified Before">
            <Controller
              name="beforeDate"
              control={control}
              render={({ field }) => (
                <>
                  <DatePicker
                    formatDate={(date?: Date) => {
                      return date?.toLocaleDateString() ?? "";
                    }}
                    onSelectDate={field.onChange}
                    showCloseButton
                    {...field}
                  />
                  <Button
                    appearance="primary"
                    style={{ marginTop: "2px", width: "fit-content" }}
                    onClick={() => field.onChange("")}
                  >
                    Clear
                  </Button>
                </>
              )}
            />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button appearance="primary" type="submit" value="submit">
            Apply
          </Button>
          <Button
            onClick={() => reset(undefined, { keepDefaultValues: false })}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
};

export default FilterPCOLsDrawer;
