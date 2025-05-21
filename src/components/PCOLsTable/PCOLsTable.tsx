/* eslint-disable @typescript-eslint/no-unused-vars */
import { PCOLFilter, usePagedPCOLs } from "src/api/PCOL/usePCOLs";
import { spPCOL } from "src/api/PCOL/usePCOL";
import {
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Spinner,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnId,
  TableColumnSizingOptions,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarProps,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  createTableColumn,
} from "@fluentui/react-components";
import {
  ArrowNextRegular,
  ArrowPreviousRegular,
  FilterRegular,
} from "@fluentui/react-icons";
import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FilterIcon } from "@fluentui/react-icons-mdl2";
import FilterRequestsDrawer from "src/components/PCOLsTable/FilterRequests";
import TableMessages from "src/components/PCOLsTable/TableMessages";

const Subject = createTableColumn<spPCOL>({
  columnId: "Subject",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Subject Title {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Subject}</TableCellLayout>;
  },
});

const Modified = createTableColumn<spPCOL>({
  columnId: "Modified",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Modified {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.Modified.toLocaleDateString()}
      </TableCellLayout>
    );
  },
});

const Stage = createTableColumn<spPCOL>({
  columnId: "Stage",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Stage {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Stage}</TableCellLayout>;
  },
});

const Contract = createTableColumn<spPCOL>({
  columnId: "Contract",
  compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Contract {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Contract}</TableCellLayout>;
  },
});

const PCOLsTable = () => {
  const { program } = useParams();
  const [page, setPage] = useState(0);
  const [sortState, setSortState] = useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "Created",
    sortDirection: "ascending",
  });
  const [filterState, setFilterState] = useState<PCOLFilter[]>([]);
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    filterOptions: ["myItems"],
  });
  const pagedItems = usePagedPCOLs(
    program || "",
    page,
    sortState,
    filterState,
    checkedValues.filterOptions.includes("allItems")
  );
  const refMap = useRef<Record<string, HTMLElement | null>>({});
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>({
      Title: { minWidth: 120, idealWidth: 280 },
      Subject: { minWidth: 120, idealWidth: 220 },
      Stage: { minWidth: 120, idealWidth: 165 },
      Modified: { minWidth: 80, idealWidth: 80 },
      Contract: { minWidth: 80, idealWidth: 80 },
    });
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const Title = useCallback(
    () =>
      createTableColumn<spPCOL>({
        columnId: "Title",
        compare: (_a, _b) => 0, // Change nothing, but utilize table's sorting icons
        renderHeaderCell: (filtered = false) => {
          return <>Control Number {filtered && <FilterIcon />}</>;
        },
        renderCell: (item) => {
          return (
            <TableCellLayout truncate>
              <Link to={"/p/" + program + "/i/" + item.Id}>{item.Title}</Link>
            </TableCellLayout>
          );
        },
      }),
    [program]
  );

  const onColumnResize = useCallback(
    (
      _e: unknown,
      { columnId, width }: { columnId: TableColumnId; width: number }
    ) => {
      setColumnSizingOptions((state) => ({
        ...state,
        [columnId]: {
          ...state[columnId],
          idealWidth: width,
        },
      }));
    },
    []
  );

  // Sort/Filter Functions
  const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
    setSortState(nextSortState);
    setPage(0);
  };

  const onCheckedValueChange: ToolbarProps["onCheckedValueChange"] = (
    _e,
    { name, checkedItems }
  ) => {
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
    setPage(0);
  };

  const columns: TableColumnDefinition<spPCOL>[] = [
    Title(),
    Subject,
    Stage,
    Modified,
    Contract,
  ];

  // RENDER
  return (
    <>
      <TableMessages />
      <FilterRequestsDrawer
        isOpen={drawerIsOpen}
        setIsOpen={setDrawerIsOpen}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <Toolbar
        checkedValues={checkedValues}
        onCheckedValueChange={onCheckedValueChange}
      >
        <ToolbarRadioGroup>
          <ToolbarRadioButton as="button" name="filterOptions" value="myItems">
            My Items
          </ToolbarRadioButton>
          <ToolbarRadioButton
            as="button"
            name="filterOptions"
            value="openItems"
          >
            Open Items
          </ToolbarRadioButton>
          <ToolbarRadioButton as="button" name="filterOptions" value="allItems">
            All Items
          </ToolbarRadioButton>
        </ToolbarRadioGroup>
        <ToolbarDivider />
        <ToolbarButton
          icon={<FilterIcon />}
          onClick={() => setDrawerIsOpen(true)}
        >
          Filters
        </ToolbarButton>
      </Toolbar>
      <DataGrid
        items={pagedItems.data?.items || []}
        columns={columns}
        getRowId={(item) => item.Id}
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        onColumnResize={onColumnResize}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => (
              <Menu openOnContext>
                <MenuTrigger>
                  <DataGridHeaderCell
                    ref={(el) => (refMap.current[columnId] = el)}
                  >
                    {renderHeaderCell(
                      filterState.filter((obj) => {
                        return obj.column === columnId;
                      }).length > 0
                    )}
                  </DataGridHeaderCell>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        // Send focus to this input?
                        setDrawerIsOpen(true)
                      }
                      icon={<FilterRegular />}
                    >
                      Filter
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<spPCOL>>
          {({ item, rowId }) => (
            <DataGridRow<spPCOL> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          appearance="primary"
          disabled={page <= 0}
          icon={<ArrowPreviousRegular />}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          appearance="primary"
          disabled={pagedItems.isFetching || !pagedItems.data?.hasNextPage}
          icon={pagedItems.isFetching ? <Spinner /> : <ArrowNextRegular />}
          iconPosition="after"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PCOLsTable;
