import { PCOLFilter } from "src/api/PCOL/usePCOLs";
declare const FilterPCOLsDrawer: ({ isOpen, setIsOpen, filterState, setFilterState, }: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    filterState: PCOLFilter[];
    setFilterState: (filters: PCOLFilter[]) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default FilterPCOLsDrawer;
