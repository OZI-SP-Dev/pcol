import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Dropdown,
  Field,
  Input,
  Option,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { DismissRegular } from "@fluentui/react-icons";
import { PCOLFilter } from "src/api/PCOL/usePCOLs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PeoplePicker, Person } from "../PeoplePicker/PeoplePicker";
import { spWebContext } from "src/api/SPWebContext";

interface IFilterFields {
  Title: string;
  Subject: string;
  Stage: string;
  Contract: string;
  Author: Person[];
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
      Author: [],
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

    if (data.Author.length > 0) {
      newFilter.push({
        column: "AuthorId",
        filter: data.Author[0].Id,
        queryString: `(Author/Id eq ${data.Author[0].Id})`,
      });
    }

    if (data.beforeDate) {
      newFilter.push({
        column: "Created",
        modifier: "beforeDate",
        filter: data.beforeDate,
        queryString: `(Created le '${new Date(
          data.beforeDate,
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
              render={({ field }) => (
                <Dropdown
                  clearable
                  id="FilterStage"
                  placeholder="Select a stage"
                  onOptionSelect={(_e, data) => {
                    field.onChange(data.selectedOptions[0] ?? "");
                  }}
                  selectedOptions={field.value ? [field.value] : []}
                  {...field}
                >
                  <Option>Approval</Option>
                  <Option>Cancelled</Option>
                  <Option>Distributed</Option>
                  <Option>Distribution</Option>
                  <Option>Draft</Option>
                  <Option>Final Review</Option>
                  <Option>Organizational Review</Option>
                  <Option>Peer Review</Option>
                  <Option>Rejected</Option>
                </Dropdown>
              )}
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
          <Field label="Initiator">
            <Controller
              name="Author"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PeoplePicker
                  ariaLabel={"Initiator"}
                  itemLimit={1}
                  selectedItems={value?.[0]?.Title ? value : []}
                  updatePeople={async (items) => {
                    if (items?.[0]?.Title) {
                      if (items[0].Id === "-1") {
                        items[0].Id = (
                          await spWebContext.web.ensureUser(items[0].EMail)
                        ).Id.toString();
                      }
                      onChange(items);
                    } else {
                      onChange([]);
                    }
                  }}
                />
              )}
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
