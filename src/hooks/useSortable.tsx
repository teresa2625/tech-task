import { useState, useMemo } from "react";
import { EmployeeLineItem } from "../interfaces/employees";

type SortConfig = {
  key: keyof EmployeeLineItem;
  direction: "asc" | "desc";
};

// TODO: Improve the sorting function since there would be more data type and add unit tests for this

const useSortableData = <T extends { [key: string]: any }>(
  employeeDatas: T[],
  config: SortConfig | null = null,
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(config);

  const sortedEmployeeDatas = useMemo(() => {
    let sortableItems = [...employeeDatas];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      });
    }
    return sortableItems;
  }, [employeeDatas, sortConfig]);

  const requestSort = (key: keyof EmployeeLineItem) => {
    const newSortConfig: SortConfig = sortConfig
      ? { ...sortConfig }
      : { key, direction: "asc" };

    if (newSortConfig.key === key) {
      newSortConfig.direction =
        newSortConfig.direction === "asc" ? "desc" : "asc";
    } else {
      newSortConfig.key = key;
      newSortConfig.direction = "asc";
    }
    setSortConfig(newSortConfig);
  };

  return {
    employeeDatas: sortedEmployeeDatas,
    requestSort,
    sortConfig,
  };
};

export default useSortableData;
